---
icon: fas fa-diagram-project
order: 1
title: 프로젝트
permalink: /projects/
# meta description ≤160 chars (Bing flags longer; without this the 163-char auto-excerpt is used)
description: 자율 시스템의 신뢰성을 직접 만들어 보는 프로젝트들 — 결제 인프라의 신뢰성 문제(상태 정합성, exactly-once, 감사 가능성, 장애 복구)가 로봇 fleet 제어에서도 같은 모양으로 나타나는 것을 코드로 확인하는 과정입니다.
---

자율 시스템의 신뢰성을 직접 만들어 보는 프로젝트들입니다. 결제 인프라에서 다루던 신뢰성 문제 — 상태 정합성, 정확 1회(exactly-once), 감사 가능성(auditability), 장애 복구 — 가 로봇 fleet 제어에서도 같은 모양으로 나타난다는 것을 코드로 확인하는 과정입니다.

저는 이 포트폴리오를 두 개의 시선으로 나눠서 만들고 있습니다. 하나는 **만드는 사람(engineer)** — 신뢰성 보장을 코드로 구현합니다. 다른 하나는 **운영하는 사람(operator)** — 그 시스템을 어떻게 관측하고 책임질 것인가를 다룹니다.

---

## fleet-master-controller — engineer

로봇 fleet(VDA5050)을 위한 **감사 로그(audit log)와 결정적 재현(deterministic replay) 레이어**입니다. Go로 작성했고 공개 저장소입니다.

- 저장소: [github.com/arti1117/fleet-master-controller](https://github.com/arti1117/fleet-master-controller)
- 언어: Go 1.21 (외부 의존성 없음)
- 표준: [VDA5050](https://github.com/VDA5050/VDA5050) v2.x — fleet 컨트롤러와 AGV/AMR 사이의 인터페이스(MQTT + JSON)

핵심 가설은 이렇습니다 — *N개의 독립 에이전트를 부분 장애 속에서 일관되게 유지하는 문제*는, 그 에이전트가 돈을 옮기든 팔레트를 옮기든 같은 문제입니다. 이 저장소는 그 가설을 검증하는 코드입니다.

### 지금까지 만든 것 (검증 완료, `-race` clean)

- **변조 탐지 감사 원장(tamper-evident audit ledger)** — 해시 체인으로 연결된 append-only 로그. 기록의 수정·삭제·재배열이 모두 탐지됩니다. 이 원장이 동시에 내구성 있는 WAL(Write-Ahead Log) 역할을 합니다. (`internal/ledger`)
- **정확 1회 크래시 복구(exactly-once crash recovery)** — 프로세스가 죽어도, 새 프로세스가 WAL을 재생(replay)해 크래시 직전 상태를 손실·중복 없이 정확히 복원합니다. 결정적(deterministic)이고 멱등(idempotent)한 fold입니다. (`internal/recovery`)
- **명령 수용 책임 추적(command-acceptance accountability)** — 발행된 모든 VDA5050 order가 로봇에 실제로 수용됐는지를 원장만으로 사후 증명합니다. `ACCEPTED / PENDING / STALLED / UNOBSERVED`로 분류합니다. 결제 시스템의 정산 대사(reconciliation, 보낸 지시 vs 확인 응답)와 같은 구조입니다. (`internal/reconcile`)
- **단일 소유 동시성 제어 (P1, 2026-07 완료)** — 할당 맵을 소유 goroutine의 지역변수로 두어, 다른 goroutine이 접근하는 코드는 컴파일 자체가 안 되도록 단독 소유를 구조로 강제합니다(락 없음). 수용 테스트: 16개 racer × 100개 작업 = 1,600개 goroutine 경합에서 작업마다 승자는 정확히 하나, `-race` clean. (`internal/fleet`)

### 만들고 있는 것 (진행 중)

- 로봇 이탈 시 작업 재할당 — lease로 죽음을 판정하고 fencing token(epoch)으로 끊겼다 돌아온 로봇의 늦은 보고를 거부합니다. 회수 결정은 정확 1회. (`internal/reassign` — 다음 작업)
- VDA5050 MQTT 트랜스포트 — 실제 트래픽으로 종단 간 검증 (`internal/vda5050` — 현재 타입 정의 단계)
- 스냅샷 + 컴팩션 — 복구가 전체 이력에 비례하지 않도록(현재는 `Open` 시 전체 이력을 메모리로 재생). **의도적으로 마지막 순서** — 현 규모에서 복구 시간은 병목이 아니고, 감사 체인을 깨지 않는 컴팩션(머리 truncation ✗, 체크포인트 방식)은 재할당 설계 뒤에 오는 게 맞다고 판단했습니다

설계 배경과 크래시 시맨틱스(torn tail, interior corruption, fsync 실패 시 fail-stop 등)는 저장소의 [`docs/design.md`](https://github.com/arti1117/fleet-master-controller/blob/main/docs/design.md)에 정리해 두었습니다.

---

## sentinel-systems — operator

같은 스택을 **운영자의 시선**에서 본 절반입니다. fleet 제어 시스템을 현장에서 어떻게 관측(observability)하고, 장애에 어떻게 대응하며, 무엇을 근거로 신뢰를 보장하는가 — 운영·관측 평면(ops/observability plane)을 다룹니다.

> 불확실하고 위험한 기술을, 인간이 통제 가능한 시스템으로 전환한다.

자율주행·로보틱스·AI 같은 고위험 자율 제어 기술을 현장에서 통제·운용하기 위한 **B2B 관제 인프라**의 설계입니다. 화려한 알고리즘이 아니라, 운영자가 매일 겪는 *운영의 고통* — 원인 모를 장애, 설정의 복잡성, 사고 원인 파악의 어려움 — 을 풀려 합니다. 세 축:

- **구조적 투명성** — 일관된 로그·지표로 설명 가능한 로직
- **현장 운영 최적화** — 'Zero-Config'을 지향하는 현장 친화적 관제 툴
- **명확한 통제 지점(Control Point)** — 위급 시 인간이 판단·개입하는 안전 거버넌스

- 저장소: [github.com/arti1117/sentinel-systems](https://github.com/arti1117/sentinel-systems)
- 현재 단계: 시장 리서치·시스템 분석·설계 문서 (코드 구현 전 — fleet-master-controller의 신뢰성 작업과 함께 진행)

> engineer(만드는 사람)와 operator(운영하는 사람)는 별개의 두 시스템이 아니라, *하나의 스택을 두 평면에서 본 것*입니다.

---

## English summary

A two-persona reliability portfolio for autonomous-fleet systems, applying reliability principles proven in payment infrastructure to robot-fleet control, and testing the thesis in code.

- **fleet-master-controller** (engineer, public, Go) — an audit-log and deterministic-replay layer for VDA5050 v2.x robot fleets. Shipped and `-race`-clean: a tamper-evident hash-chained audit ledger that doubles as the WAL, exactly-once crash recovery via deterministic replay, command-acceptance accountability (ACCEPTED/PENDING/STALLED/UNOBSERVED) — the fleet analogue of payment settlement reconciliation — and compiler-enforced single-owner concurrency (P1 complete: 16 racers × 100 contended tasks = 1,600 goroutines, exactly one winner per task, `-race` clean). In progress: dropout reassignment with lease + fencing tokens (next), MQTT transport, then snapshot/compaction — deliberately last. Repo: github.com/arti1117/fleet-master-controller
- **sentinel-systems** (operator, public) — the ops/observability plane of the same stack: a B2B control-and-monitoring infrastructure for high-risk autonomous tech, built around structural transparency, zero-config field operation, and a clear human control point. Currently at the market-research and system-design stage. Repo: github.com/arti1117/sentinel-systems

Thesis: keeping N independent agents consistent under partial failure is the same problem whether they move money or move pallets.

---
icon: fas fa-diagram-project
order: 1
title: 프로젝트
permalink: /projects/
# meta description ≤160 chars (Bing flags longer; without this the 163-char auto-excerpt is used)
description: 결제 인프라에서 다뤄 온 상태 정합성·중복 처리·장애 복구 문제를 로봇 fleet 제어 코드와 설계로 검증하는 공개 학습 기록입니다.
---

결제 인프라에서 다뤄 온 신뢰성 문제 — 상태 정합성, 정확 1회(exactly-once), 감사 가능성(auditability), 장애 복구 — 가 로봇 fleet 제어에서도 같은 모양으로 나타나는지를 코드와 설계로 검증하는 공개 학습 기록입니다.

두 저장소는 같은 문제를 두 관점에서 살펴봅니다. `fleet-master-controller`는 신뢰성 보장이 코드에 요구하는 제약을, `sentinel-systems`는 운영자가 시스템을 관측하고 통제하기 위한 조건을 다룹니다.

---

## fleet-master-controller — Go 학습·검증

로봇 fleet(VDA5050)을 위한 **감사 로그(audit log)와 결정적 재현(deterministic replay) 레이어**입니다. Go로 작성했고 공개 저장소입니다.

- 저장소: [github.com/arti1117/fleet-master-controller](https://github.com/arti1117/fleet-master-controller)
- 언어: Go 1.21 (외부 의존성 없음)
- 표준: [VDA5050](https://github.com/VDA5050/VDA5050) v2.x — fleet 컨트롤러와 AGV/AMR 사이의 인터페이스(MQTT + JSON)

핵심 가설은 이렇습니다 — *N개의 독립 에이전트를 부분 장애 속에서 일관되게 유지하는 문제*는, 그 에이전트가 돈을 옮기든 팔레트를 옮기든 같은 문제입니다. 이 저장소는 그 가설을 검증하는 코드입니다.

AI(Claude Code)로 구현한 공개 Go 학습 프로젝트이며, 제가 밝힌 역할은 설계 의도 설정입니다. 아래 목록은 저장소의 코드·테스트로 확인한 범위이고 제 단독 구현 경력을 뜻하지 않습니다. 핵심 경로의 학습 완료 기준은 자력 재구성과 설명입니다.

### 저장소에서 검증한 동작과 경계 (`-race` clean)

- **해시 체인 원장 무결성 검사** — 저장된 hash와 `PrevHash`의 불일치(재계산하지 않은 수정·중간 삭제·재배열)를 `Verify`가 탐지하며, 같은 파일이 내구성 있는 WAL(Write-Ahead Log) 역할을 합니다. 다만 신뢰된 외부 checkpoint·서명·MAC이 없어 쓰기 권한을 가진 공격자가 변경 뒤 suffix의 hash를 다시 계산하거나 완전한 suffix를 삭제하면 탐지하지 못합니다. (`internal/ledger`)
- **내구 커밋 기준 크래시 복구** — 새 프로세스가 WAL에 남은 유효한 완전 레코드에서 할당 상태만 결정적으로 재구성합니다. WAL rollback과 경쟁 writer handoff가 없고 file-backed ledger가 열린 범위에서 성공한 `Append`는 복구 대상임이 보장됩니다. 미완성(torn) tail은 버리고 `fsync` 실패는 결과 불명으로 fail-stop하며, lease·heartbeat 같은 런타임 liveness 상태는 복구하지 않습니다. 현재 kill-9 harness는 clean prefix 재개방만 확인하고 ack된 task 집합과 복구 결과를 대조하지 않습니다. (`internal/recovery`)
- **명령 확인 상태 추적(command-confirmation accountability)** — 원장에 기록된 issued order와 로봇 state report를 대조해 수용 **확인 상태**를 `ACCEPTED / PENDING / STALLED / UNOBSERVED`로 분류합니다. 이는 보고된 확인 상태를 증명하며 로봇 내부 의도나 물리 실행을 증명하지는 않습니다. 결제 시스템의 정산 대사(reconciliation, 보낸 지시 vs 확인 응답)와 같은 구조입니다. (`internal/reconcile`)
- **단일 소유 이벤트 루프 (P1, 2026-07 저장소 동작 검증)** — 한 `Core` 인스턴스 안에서 fleet 상태 연산을 owner goroutine 하나가 순차 실행합니다(락 없음). 수용 테스트: 16개 racer × 100개 작업 = 1,600개 goroutine 경합에서 작업마다 승자는 정확히 하나, `-race` clean. 다만 현재 `state`는 package-scope 타입이고 포인터가 연산 closure에 전달되므로, 다른 코드의 접근 불가능성까지 컴파일러가 강제한다고 보지는 않습니다. 같은 ledger 위에 여러 `Core`를 여는 것도 API가 막지 않습니다. (`internal/fleet`)
- **로봇 이탈 재할당과 fencing (P4, 2026-07 저장소 동작 검증)** — lease 만료(또는 suspect grace) 뒤 적격 target이 있으면 현재 grant를 재할당하고, 그 원장 index를 epoch로 사용해 살아 있는 grant와 맞지 않는 완료를 거부·기록합니다. 적격 target이 없으면 `Stranded`, 이미 끝난 task의 늦은 보고는 `ErrUnknownTask`(fence 기록 없음)이며, epoch 비재사용은 WAL이 rollback되지 않은 범위에서만 성립합니다. 연결/last-will은 현재 `ReportDisconnect` 입력으로만 모델링됐고 실제 MQTT 수신은 아직 없습니다. (`internal/fleet`, `internal/reassign`)

**내구성 전제:** file-backed `Ledger`가 `Core`보다 오래 살아 있어야 합니다. 현재 코드는 이 종료 순서를 강제하지 않아 ledger를 먼저 닫으면 이후 `Append`가 메모리 성공으로 퇴행합니다. `Open`도 lock 전에 파일을 읽어 writer handoff 중 stale replay/truncate가 가능한 미해결 경계가 있습니다. P4 fencing은 컨트롤러 상태 평면의 보장이며 로봇의 물리 동작을 멈추지 않습니다.

### 다음 검증 과제

- **스냅샷 + 컴팩션** — 현재 `Open` 시 전체 이력을 재생하는 O(history) 복구 비용을 줄이되, 감사 체인을 깨는 head truncation 대신 체인 안의 checkpoint와 보관 segment 방식을 검증합니다. (다음 작업)
- **VDA5050 MQTT 트랜스포트** — 현재 타입·토픽 helper 단계에서 실제 MQTT 트래픽과 simulated AGV를 이용한 종단 간 검증으로 확장합니다. (스냅샷·컴팩션 이후)

설계 배경과 크래시 시맨틱스(torn tail, interior corruption, fsync 실패 시 fail-stop 등)는 저장소의 [`docs/design.md`](https://github.com/arti1117/fleet-master-controller/blob/main/docs/design.md)에 정리해 두었습니다.

---

## sentinel-systems — operator

같은 문제를 **운영자의 시선**에서 탐색하는 설계·리서치 저장소입니다. fleet 제어 시스템을 현장에서 어떻게 관측(observability)하고, 장애에 어떻게 대응하며, 무엇을 근거로 신뢰를 보장하는가 — 운영·관측 평면(ops/observability plane)을 다룹니다.

> 불확실하고 위험한 기술을, 인간이 통제 가능한 시스템으로 전환한다.

자율주행·로보틱스·AI 같은 고위험 자율 제어 기술을 현장에서 통제·운용하기 위한 **B2B 관제 인프라**의 설계입니다. 화려한 알고리즘이 아니라, 운영자가 매일 겪는 *운영의 고통* — 원인 모를 장애, 설정의 복잡성, 사고 원인 파악의 어려움 — 을 풀려 합니다. 세 축:

- **구조적 투명성** — 일관된 로그·지표로 설명 가능한 로직
- **현장 운영 최적화** — 'Zero-Config'을 지향하는 현장 친화적 관제 툴
- **명확한 통제 지점(Control Point)** — 위급 시 인간이 판단·개입하는 안전 거버넌스

- 저장소: [github.com/arti1117/sentinel-systems](https://github.com/arti1117/sentinel-systems)
- 현재 단계: 시장 리서치·시스템 분석·설계 문서 (코드 구현 전 — fleet-master-controller의 신뢰성 작업과 함께 진행)

> 코드로 보장을 검증하는 관점과 운영 조건을 설계하는 관점은 별개의 두 시스템이 아니라, *하나의 스택을 두 평면에서 본 것*입니다.

---

## English summary

Two public learning and research repositories examine how payment-infrastructure reliability problems reappear in robot-fleet control: one through code, the other through operations design.

`fleet-master-controller` is a public Go learning project implemented with AI (Claude Code). JY describes his role as setting the design intent. The properties below are code/test-backed repository behaviors, not claims of solo authorship; independent reconstruction and explanation are the completion gate for learning the core paths.

- **fleet-master-controller** (public Go learning repository) — an audit-log and deterministic-replay layer for VDA5050 v2.x robot fleets. Code/test-backed and `-race`-clean behaviors include hash-chain self-consistency checks, deterministic reconstruction of the retained grant projection, recorded command-confirmation classification (ACCEPTED/PENDING/STALLED/UNOBSERVED), one-`Core` owner-event-loop concurrency, and lease-based reassignment with state-plane fencing. Boundaries: the current hash chain is not adversarial tamper evidence without a trusted external checkpoint/signature; file-backed `Ledger` must outlive `Core`, and `Open` has a pre-lock read race; the type structure does not provide compiler-enforced state unreachability or prevent multiple Cores; fencing assumes a live grant and a non-rolled-back WAL; liveness is not recovered; the kill-9 harness does not correlate acknowledgements; MQTT ingestion and physical-actuation fencing are not implemented. Next: snapshot/compaction, followed by MQTT transport and end-to-end validation. Repo: github.com/arti1117/fleet-master-controller
- **sentinel-systems** (operator, public) — the ops/observability plane of the same stack: a B2B control-and-monitoring infrastructure for high-risk autonomous tech, built around structural transparency, zero-config field operation, and a clear human control point. Currently at the market-research and system-design stage. Repo: github.com/arti1117/sentinel-systems

Thesis: keeping N independent agents consistent under partial failure is the same problem whether they move money or move pallets.

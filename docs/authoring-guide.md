# 글 작성 · 분류 가이드 (Authoring & Taxonomy Guide)

> 이 문서는 발행 대상이 아니다. `_config.yml`의 `exclude:`에 `docs`가 포함되어 빌드에서 제외된다.
> 블로그의 분류 체계(카테고리/태그)와 front matter 규약을 한곳에 정리한다.

---

## 0. 한 줄 원칙

블로그 = **과정(process)** 기둥. 글은 "무엇을 만들었나"가 아니라 **"어떤 대안을 저울질해 왜 그렇게 결정했나"**를 남긴다.
포지셔닝 핵심 = **인공지능 · 로봇 · 신뢰성**. 모든 글은 아래 카테고리 중 하나에 속한다.

사이트 정체성: title = *Reliability Architect for Autonomous Systems*, tagline = *불확실하고 위험한 기술을 인간이 통제 가능한 시스템으로 전환한다*.

---

## 1. 카테고리 (대분류) — 5개 고정

Chirpy에서 카테고리는 별도 등록 파일이 필요 없다. post front matter의 `categories:`만으로 자동 생성된다.
**대분류는 아래 5개로 고정한다. 새 대분류를 늘리지 않는다.**

| 카테고리 | 범위 | 미래 글 슬롯 예시 |
| --- | --- | --- |
| **인공지능** | AI·에이전트 쪽. 코딩 에이전트 fleet 신뢰성, 다중 에이전트 오케스트레이션, physical AI 수렴. | 코딩 에이전트 fleet 신뢰성 설계, 에이전트 어댑터, LLM 시스템 운영 |
| **로봇** | 로봇 fleet 쪽. 컨트롤 플레인, VDA5050, AMR 관제, fleet-master-controller·sentinel-systems 설계 노트. | fleet-master-controller 설계, kill-9 데모 회고, VDA5050 어댑터, 관제 인프라 설계 |
| **분산시스템** | 결제 인프라 6년에서 길어 올린 도메인 무관 패턴. 상태 정합성·정확 1회·합의·관측성·장애 대응. | `state-reconciliation` 멱등성 글, exactly-once 설계, observability 회고 |
| **학습기록** | 새 스택을 익히는 과정 자체. Go·동시성 실험·도구(bench/pprof)·커리큘럼. | go-lessons 회고, Go race detector 실험, MQTT/조정 루프 학습 노트 |
| **신뢰성** | 신뢰성 *자체*를 주제로 다루는 글(도메인 횡단). 감사·결정적 재현·기록 무결성·exactly-once의 일반 원리. | "신뢰의 닻=기록 무결성" 같은 원리 글, 4증명 종합, 신뢰성 패턴 일반화 |

### 1-1. 카테고리는 한국어

1차 청중이 한국 채용 담당(다임리서치·카카오모빌리티·우아한형제들 등)이고 사이트 `lang: ko-KR`·본문 한국어와 톤이 맞는다. 영어권 노출은 **제목·태그(영어)·영문 요약·페이지 title**이 담당한다.

### 1-2. Chirpy 카테고리 규약 — 한 글 = 한 대분류

Chirpy에서 `categories: [A, B]`는 **평행 2개가 아니라 "B는 A의 하위"라는 2단계 계층**이다. 5개는 *평행* 대분류이므로:

- **첫 자리에 5개 중 정확히 하나**(그 글의 일차 소속)를 둔다. 둘째 자리는 선택적 하위 카테고리(평행 대분류를 또 넣지 말 것).
- 글이 여러 대분류에 걸치면(흔함) — 일차 하나만 카테고리로 고르고 **나머지는 태그**로 잇는다.
- 특히 **신뢰성**은 거의 모든 글을 관통한다. *신뢰성 원리 자체가 주제*인 글만 `[신뢰성]`에 두고, 그 외(로봇/분산시스템 글이 신뢰성을 다룰 때)는 해당 카테고리 + `reliability` 태그.

현재 레포 정합(적용 완료):

| 파일 | categories | 비고 |
| --- | --- | --- |
| `_posts/2026-06-20-blog-open.md` | `[학습기록]` | 시드/메타 글 |
| `_drafts/2026-06-21-state-reconciliation.md` | `[분산시스템]` + `reliability` 태그 | 분산시스템 일차, 신뢰성은 태그로 횡단 |

---

## 2. 태그 (소분류) 컨벤션

태그 = 5개 카테고리를 가로지르는 평행·교차 축.

- **영어 소문자 + 하이픈**(kebab-case). 예: `exactly-once`, `state-reconciliation`, `control-plane`. permalink(`/tags/:name/`) 안전.
- **글당 3~5개.** 과다 금지.
- 신규 태그는 아래 표에 먼저 등재 후 사용.

| 태그 | 의미 | 주로 붙는 카테고리 |
| --- | --- | --- |
| `reliability` | 신뢰성(횡단 태그 — 신뢰성이 *주제*면 카테고리, *속성*이면 태그) | 인공지능·로봇·분산시스템 |
| `idempotency` | 멱등성 | 분산시스템 |
| `exactly-once` | 정확 1회 전달/처리 | 분산시스템·로봇·신뢰성 |
| `state-reconciliation` | 상태 정합성·대사 | 분산시스템·로봇 |
| `observability` | 관측성·로깅·추적 | 분산시스템·로봇 |
| `consensus` | 합의·리더 선출·fencing/lease | 분산시스템·로봇 |
| `control-plane` | 컨트롤 플레인 설계 | 로봇·인공지능 |
| `audit-log` | 감사 로그·기록 무결성 | 로봇·신뢰성 |
| `deterministic-replay` | 결정적 재현 | 로봇·신뢰성 |
| `fleet` | 로봇/에이전트 fleet | 로봇·인공지능 |
| `vda5050` | VDA5050 프로토콜 | 로봇 |
| `multi-agent` | 다중 에이전트 오케스트레이션 | 인공지능 |
| `golang` | Go 언어 | 학습기록·로봇 |
| `concurrency` | 동시성 | 학습기록·분산시스템 |
| `meta` | 블로그 운영·공지성 | 학습기록 |

> 인물·회사·내부 시스템명은 태그로 쓰지 않는다(기밀·과장 회피).

---

## 3. Front matter 표준 템플릿

```yaml
---
title: 글 제목 (한국어, 담백하게)
date: 2026-06-21 09:00:00 +0900   # KST(+0900). 미래 날짜면 발행 안 됨
categories: [로봇]                 # §1의 5개 중 하나. 하위 필요시 [로봇, 컨트롤플레인]
tags: [control-plane, reliability] # §2 사전에서, 3~5개, 영어 kebab-case
toc: true
pin: false                         # 대표글에만 true (1개 정도)
# image:                           # 대표 이미지 있을 때만
#   path: /assets/img/.../cover.png
#   alt: 설명
---
```

### 3-1. 본문 구조 (의사결정 서사 기본형)

1. 문제 — 무엇이 어긋나고, 어긋나면 무엇이 깨지나 (구체 장면 훅, 익명화)
2. 왜 어려운가 — 분산/동시성 깊이가 드러나는 지점
3. 첫 시도와 한계
4. 설계 결정 — 고려한 대안 2~3개 → 채택 → 버린 것
5. 결과 — before/after (수치는 일반화: "order-of-magnitude", 정확 비율 ✗)
6. 일반 원리 — 도메인을 떼면 남는 것
7. (선택) 로봇/fleet·에이전트로의 전이 — "전이 가능한 패턴"(동형 단정 ✗)

> 다이어그램이 필요하면 front matter에 `mermaid: true`, 수식은 `math: true` (성능상 글 단위 opt-in, 기본 생략).

### 3-2. 학습기록(go-lessons) 인용 규칙

`JY/writing/go-lessons/`는 **로컬**(별도 repo 아님). 학습기록 글에서는 **코드를 인라인 스니펫으로 인용**한다(외부 repo 링크 ✗ — 죽은 링크 회피). 공개 repo로 올리기로 결정하기 전까지 이 규칙 유지.

### 3-3. 영문 요약 (맨 아래 고정)

```markdown
---

## English Summary

> 3~5문장. LinkedIn 공유용. 본문 핵심 결정과 trade-off만.
```

---

## 4. 발행 게이트 (공개 전 1회 체크)

- [ ] 카테고리 = §1의 5개 중 하나(첫 자리 하나)
- [ ] 태그 = §2 사전 등재 + 3~5개 + 영어 kebab-case
- [ ] 기밀: 내부 시스템명·고객·계약·incident ID·금액·정확 비율 제거(일반화) — gme/SECURITY.md
- [ ] 과장 ✗: 완료한 것만 단정. 진행 중인 것은 "설계 방향"·"진행 중" 표기
- [ ] 외부 링크 살아 있나 (fleet-master-controller·sentinel-systems 둘 다 **PUBLIC** — 링크 OK)
- [ ] 영문 요약 포함
- [ ] `date`가 과거/현재 (미래면 미발행)

---

## 5. 사이드바·탭 메모

- Categories 탭은 5개 카테고리 노출. Tags 탭은 §2 사전 크기에 비례(글당 3~5개로 밀도 관리).
- `_tabs/` order: Categories1·Tags2·Archives3·Projects4·Resume5·About6.

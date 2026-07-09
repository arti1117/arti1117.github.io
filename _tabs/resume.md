---
icon: fas fa-id-card
order: 2
title: 이력
permalink: /resume/
---

이 페이지는 이 블로그의 **결과(result)** 기둥입니다 — 완료한 것을 담백하게 기록합니다. 진행 중인 작업은 [Projects](/projects/)에 따로 둡니다.

## 최재영 (Jaeyeong Choi)

**Backend / Reliability Engineer** · 인공지능 로봇·자율 시스템 fleet의 신뢰성 (Control-Plane & Fleet Orchestration)
결제 인프라 운영 신뢰성 · 상태 정합성

[GitHub](https://github.com/arti1117) · [LinkedIn](https://www.linkedin.com/in/jaeyeong-choi-561058341/) · Darkmoonz1004@gmail.com · 서울

## Summary

연 4조원·100만+ 이용자 규모의 해외송금 인프라에서 이종 시스템 간 상태 정합성과 24/7 운영 신뢰성을 6년간 담당했습니다. 대규모 트랜잭션을 멱등성·dedup으로 exactly-once 효과로 처리하며 장애 복구, 중복 실행 차단, 이종 시스템 간 상태 드리프트 정정을 다뤘습니다. 현재 이 신뢰성·정합성 경험을 로봇 fleet 오케스트레이션·컨트롤 플레인으로 확장하고 있습니다.

## 경력

### 글로벌머니익스프레스 · Senior Backend Engineer — 2020.03–현재
해외송금 핀테크(연 4조원·100만+ 이용자) · 24/7 무중단 결제 인프라의 상태 정합성·장애 복구·외부 시스템 통합 담당

- 오픈뱅킹 인증 시스템을 단일 상태기계로 설계·구축·운영, 송금 트래픽 대부분을 무중단 처리. 외부 중계 의존 → 자체 통제 구조로 전면 전환.
- 이기종 시스템 간 상태 정합성 약 10배+ 개선 — 거래 규칙 기반 멱등성으로 불일치 원천 차단 + 잔여분 탐지·라우팅.
- 결제 채널의 중복 처리(double-processing) incident를 멱등성 기반 단일 처리로 차단해 exactly-once 효과를 정착, 후속 유사 건의 표준 대응 모델로 확립.
- 운영 incident 대응 체계 확립 — 채널 차단·복구 판단, RCA·운영 프로토콜 문서화, 신규 입사자 멘토링.
- 사후 대사 *이전*에 누락·지연을 차단하는 사전 검증 자동화(toil 제거).
- 이기종 외부 시스템 100개+ 통합, 사내 8개+ 부서 조정.

스택: C# · .NET · MSSQL T-SQL · Redis · CI/CD

### TOYO System (日本) · 시스템 엔지니어 — 2018.02–2019.09
물류·제조 자동화(SCM·스마트팩토리) 도메인. Bridgestone Group SCM 플랫폼 연계, 물류·결제 시스템 개발·운영.

## 프로젝트

- **F1TENTH Korea Championship 2025** — ROS2 기반 1:10 자율주행, 시뮬→실차 파이프라인. 다중 에이전트 command/state·실패 처리·동시성 관점에서 기여, 예선 통과.
- **Gugudan AI Server** — FastAPI 기반 AI 상담 백엔드의 인증 도메인(OAuth2·JWT·세션) 전담, Hexagonal 아키텍처 분리.

## 기술 역량

- **운영 신뢰성·정합성** — 상태 정합성·reconciliation, 멱등성·dedup(exactly-once), 24/7 무중단 운영, 장애 대응·RCA, 관측성, 무중단 마이그레이션
- **언어·백엔드** — C# / .NET, MSSQL T-SQL, Python · FastAPI · Go(학습 중)
- **인프라·메시징** — MQTT, RabbitMQ, Redis, Docker, CI/CD (GitLab Runner · Jenkins)
- **언어** — 한국어(원어민) · 일본어(실무) · 영어(TOEIC 820) · 중국어(HSK 5급)

## 교육

- 동국대학교 중어중문학과(복수전공 경영학) · 상해외국어대학 교환학생
- NIPA-Google ML 부트캠프 · AI Multi-Agent 서비스 실전프로젝트 · Deep Learning Specialization (Coursera)

---

## English Summary

Backend / Reliability Engineer focused on the reliability of autonomous-system fleets (control-plane & orchestration). Six years owning state consistency and 24/7 operational reliability on a remittance platform handling roughly ₩4T/year and 1M+ users — exactly-once effects via idempotency/dedup, failure recovery, and cross-system state-drift correction. Now extending that reliability experience to robot-fleet orchestration and control planes.

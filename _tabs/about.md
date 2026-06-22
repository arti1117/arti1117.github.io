---
# the default layout is 'page'
icon: fas fa-info-circle
order: 6
---

> **불확실하고 위험한 기술을, 인간이 통제 가능한 시스템으로 전환한다.**
{: .prompt-tip }

**자율 시스템의 신뢰는 운이 아니라 설계의 문제다. 내가 검증한 범위에서 그 원칙과 증명을 기록한다 — 더 나은 설계가 있다면 듣고 싶다.**

결제 인프라에서 이종 시스템 간 상태 정합성과 운영 신뢰성을 다뤄 왔습니다. 그 경험을 자율 시스템(로봇 fleet)의 신뢰성으로 옮기는 — 설계로 푸는 — 과정을 이 블로그에 기록합니다.

여기서 다루는 것은 결과보다 **과정**입니다 — 어떤 대안을 저울질해, 무엇을 버리고, 왜 그렇게 결정했는지.

## 관심 영역

- 이종 시스템 간 상태 정합성, 정확 1회(exactly-once), 드리프트 수렴
- fleet 컨트롤 플레인: 감사 로그(audit log), 결정적 재현(deterministic replay)
- 시스템 관측성(observability)과 장애 대응

## 링크

- GitHub — [github.com/arti1117](https://github.com/arti1117)

## 라이선스

- 글(Posts): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — 출처 표기 시 자유 사용
- 코드(Code): MIT

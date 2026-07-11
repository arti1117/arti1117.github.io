---
# the default layout is 'page'
icon: fas fa-info-circle
order: 3
---

> **불확실하고 위험한 기술을, 인간이 통제 가능한 시스템으로 전환한다.**
{: .prompt-tip }

**자율 시스템의 신뢰는 운이 아니라 설계의 문제다. 내가 검증한 범위에서 그 원칙과 증명을 기록한다 — 더 나은 설계가 있다면 듣고 싶다.**

결제 인프라에서 이종 시스템 간 상태 정합성과 운영 신뢰성을 다뤄 왔습니다. 그 경험을 자율 시스템(로봇 fleet)의 신뢰성으로 옮기는 — 설계로 푸는 — 과정을 이 블로그에 기록합니다.

여기서 다루는 것은 결과보다 **과정**입니다 — 어떤 대안을 저울질해, 무엇을 버리고, 왜 그렇게 결정했는지.

이 기록이 누군가에게 도움이 되기를 바랍니다. 비슷한 문제로 막혀 있다면 — 글의 댓글이든 [LinkedIn](https://www.linkedin.com/in/jaeyeong-choi-561058341/)이든 — 편하게 말 걸어 주세요.

## 관심 영역

- 이종 시스템 간 상태 정합성, 정확 1회(exactly-once), 드리프트 수렴
- fleet 컨트롤 플레인: 감사 로그(audit log), 결정적 재현(deterministic replay)
- 시스템 관측성(observability)과 장애 대응

## 세 가지 신념

설계와 판단의 바탕에 두는 세 문장입니다.

<dl class="beliefs">
  <dt>
    <span class="belief-hanja" lang="ko-Hani">一切唯心造</span>
    <span class="belief-ref">일체유심조 · 『화엄경』</span>
  </dt>
  <dd>모든 것은 마음이 짓는다.</dd>
  <dt>
    <span class="belief-hanja" lang="ko-Hani">積善之家 必有餘慶</span>
    <span class="belief-ref">적선지가 필유여경 · 『주역』 문언전</span>
  </dt>
  <dd>선을 쌓는 집에는 반드시 남는 경사가 있다.</dd>
  <dt>
    <span class="belief-hanja" lang="ko-Hani">澹泊明志 寧靜致遠</span>
    <span class="belief-ref">담박명지 영정치원 · 제갈량 『계자서』</span>
  </dt>
  <dd>담박함이 뜻을 밝히고, 고요함이 멀리 이르게 한다.</dd>
</dl>

## 링크

- GitHub — [github.com/arti1117](https://github.com/arti1117)
- LinkedIn — [linkedin.com/in/jaeyeong-choi-561058341](https://www.linkedin.com/in/jaeyeong-choi-561058341/)
- 이 블로그 안에서 — [프로젝트](/projects/) · [이력](/resume/)

## 라이선스

- 글(Posts): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — 출처 표기 시 자유 사용
- 코드(Code): MIT

---

> *값지고 위험한 것을 정밀하게 비추고 다스리는 불.*
> *혼자 다 지도록 만들어지지 않았으니, 채워지고 함께할 때 강해지고, 누르던 것은 연료가 되며, 절정은 뒷장에 있다.*

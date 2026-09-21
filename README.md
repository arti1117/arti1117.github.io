# arti1117.github.io

[기술 블로그](https://arti1117.github.io)의 승인된 글과 Jekyll/Chirpy 사이트를 관리한다. 한국어 본문과 영문 요약으로 경험·판단의 근거와 한계를 기록한다.

이 루트 README 하나가 저장소 목적·목차·운영 안내를 맡는다. 글의 구성·분류·검토 기준은 [작성 가이드](https://github.com/arti1117/arti1117.github.io/blob/master/docs/authoring-guide.md)에 둔다.

<a id="files"></a>

## 파일 목차

| 위치 | 역할 |
|---|---|
| [_posts/](https://github.com/arti1117/arti1117.github.io/tree/master/_posts) | 승인된 글 스냅샷. `.placeholder`는 초기 빈 폴더를 보존하던 파일 |
| [_tabs/](https://github.com/arti1117/arti1117.github.io/tree/master/_tabs) | [About](https://github.com/arti1117/arti1117.github.io/blob/master/_tabs/about.md) · [포트폴리오 위치 안내](https://github.com/arti1117/arti1117.github.io/blob/master/_tabs/projects.md) · 분류·태그·보관함 페이지 |
| [_data/](https://github.com/arti1117/arti1117.github.io/tree/master/_data) | 사이드바 연락처와 글 공유 설정 |
| [_includes/](https://github.com/arti1117/arti1117.github.io/tree/master/_includes) | `head.html`·`sidebar.html` 테마 오버라이드 |
| [_plugins/](https://github.com/arti1117/arti1117.github.io/tree/master/_plugins) | 글의 Git 수정일을 읽는 빌드 훅 |
| [assets/css/](https://github.com/arti1117/arti1117.github.io/tree/master/assets/css) | 사이트 스타일 |
| [assets/fonts/](https://github.com/arti1117/arti1117.github.io/tree/master/assets/fonts) | 자체 호스팅 폰트 |
| [assets/img/](https://github.com/arti1117/arti1117.github.io/tree/master/assets/img) | 아바타·소셜 미리보기. [favicons/](https://github.com/arti1117/arti1117.github.io/tree/master/assets/img/favicons)는 실제 아이콘·manifest |
| [docs/authoring-guide.md](https://github.com/arti1117/arti1117.github.io/blob/master/docs/authoring-guide.md) | 글 작성·분류·공개 검토 기준 |
| [docs/brand/og-image.svg](https://github.com/arti1117/arti1117.github.io/blob/master/docs/brand/og-image.svg) | `assets/img/og.png`에 대응하는 편집 원본 |
| [docs/history/](https://github.com/arti1117/arti1117.github.io/tree/master/docs/history) | 비활성 포트폴리오 실행 설정과 옛 JC 도안. 현재 실행 설정·favicon 생성 원본으로 사용하지 않음 |
| [tools/](https://github.com/arti1117/arti1117.github.io/tree/master/tools) | 아래 미리보기·검증 스크립트 |
| [.github/workflows/](https://github.com/arti1117/arti1117.github.io/tree/master/.github/workflows) | 빌드·배포와 주간 외부 링크 검사 |
| [_config.yml](https://github.com/arti1117/arti1117.github.io/blob/master/_config.yml) | 사이트·테마·컬렉션·빌드 설정 |
| [Gemfile](https://github.com/arti1117/arti1117.github.io/blob/master/Gemfile) · [Gemfile.lock](https://github.com/arti1117/arti1117.github.io/blob/master/Gemfile.lock) | 직접 의존성과 고정된 전체 버전 |
| [index.html](https://github.com/arti1117/arti1117.github.io/blob/master/index.html) · [rss.xml](https://github.com/arti1117/arti1117.github.io/blob/master/rss.xml) | 홈 진입점과 RSS 2.0 피드. 테마의 Atom 피드와 구분 |
| [Google 확인 파일](https://github.com/arti1117/arti1117.github.io/blob/master/google27f3e3f702e1370e.html) · [Naver 확인 파일](https://github.com/arti1117/arti1117.github.io/blob/master/naver1deb56dfb319b064e4e8a336b0c4092a.html) · [IndexNow 키](https://github.com/arti1117/arti1117.github.io/blob/master/a49ee281e89b426a9846bd39c7534996.txt) | 공개 사이트 소유 확인 파일 |
| [.editorconfig](https://github.com/arti1117/arti1117.github.io/blob/master/.editorconfig) · [.gitattributes](https://github.com/arti1117/arti1117.github.io/blob/master/.gitattributes) · [.gitignore](https://github.com/arti1117/arti1117.github.io/blob/master/.gitignore) · [.nojekyll](https://github.com/arti1117/arti1117.github.io/blob/master/.nojekyll) · [LICENSE](https://github.com/arti1117/arti1117.github.io/blob/master/LICENSE) | 서식·Git 처리·생성물 제외·Pages 관례·라이선스 |

Jekyll과 검색엔진이 참조하는 경로는 유지한다. `docs/`와 루트 README는 사이트 배포 대상에서 제외한다. `_site/`, `.jekyll-cache/`, `vendor/`, `.bundle/`, `_drafts/`는 로컬 생성물·의존성·미리보기용 경로다.

<a id="writing"></a>

## 글 작성과 공개

1. 편집 원본은 형제 비공개 저장소 `../arti1117.github.io.private/drafts/YYYY-MM-DD-slug.md`에 둔다. 앞머리 형식과 내용 기준은 작성 가이드를 따른다.
2. [preview-docker.sh](https://github.com/arti1117/arti1117.github.io/blob/master/tools/preview-docker.sh)로 비공개 원고를 읽기 전용 마운트해 검토한다. 이 저장소의 `_drafts/`에 편집 사본을 만들지 않는다.
3. JY가 공개할 문구와 범위를 최종 확인한다. 원고의 미완성·실험·AI 도움 범위를 실제 근거에 맞춰 표시한다.
4. 승인 시 비공개 원본의 `draft_status`를 `reviewed`로 기록하고 원본을 보존한다. 승인된 스냅샷만 `_posts/`에 복사하며 공개본에서는 내부 상태 필드를 제거한다. 두 저장소를 자동 동기화하지 않는다.
5. 아래 빌드 검증을 통과한 뒤 승인된 변경을 반영한다. 로컬 검사와 원격 배포 성공은 각각 확인한다.

<a id="verification"></a>

## 미리보기·검증

저장소 루트에서 실행한다.

```bash
bundle install
bundle exec jekyll serve    # 공개된 글만 미리보기
bash tools/test.sh          # production build + 내부 링크 검사
```

호스트 Ruby 없이 비공개 원고까지 확인하려면 Docker와 실행 중인 Docker 엔진을 준비하고 `bash tools/preview-docker.sh`를 사용한다. 기본 원고 경로를 바꿀 때는 `BLOG_PRIVATE_DRAFTS_DIR`을 지정한다. [run.sh](https://github.com/arti1117/arti1117.github.io/blob/master/tools/run.sh)는 호스트 Ruby 환경의 serve 옵션 도우미이며 `--production`·`--host`를 지원한다.

`tools/test.sh`는 외부 링크를 검사하지 않는다. 외부 링크 검사는 별도 워크플로가 맡는다. `Gemfile.lock`은 보존한다. 테마 버전을 올릴 때는 `_includes/head.html`과 `_includes/sidebar.html`을 모두 해당 버전의 원본과 비교해 반영한다.

<a id="automation"></a>

## 배포·운영

- [pages-deploy.yml](https://github.com/arti1117/arti1117.github.io/blob/master/.github/workflows/pages-deploy.yml): `main`·`master` push와 수동 실행. `paths-ignore`에 해당하는 변경만 있으면 자동 실행되지 않는다. 기본 브랜치는 `master`이고 Pages 소스는 GitHub Actions다.
- [link-check.yml](https://github.com/arti1117/arti1117.github.io/blob/master/.github/workflows/link-check.yml): 발행 글·탭·루트 README의 외부 링크를 매주 토요일 06:00 KST에 검사한다. 이 목차의 파일·폴더 링크는 GitHub 주소로 연결해 사이트에 배포되지 않는 문서도 올바르게 검사한다.
- IndexNow 키는 사이트 루트에서 제공하는 공개 소유 확인 값이다. ping 작업은 `continue-on-error`로 설정돼 있다.
- 옛 정적 포트폴리오는 `legacy` 브랜치에 보존돼 있다. `docs/history/legacy-portfolio-launch.json`은 제거된 `/lang/JaeyeongChoi.ko.html`을 가리키는 비활성 설정이다.

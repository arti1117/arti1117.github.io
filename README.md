# arti1117.github.io

Personal tech blog — built on [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) (Jekyll), deployed to GitHub Pages via GitHub Actions.

Distributed-systems & autonomous-system reliability notes. Korean body + English summaries.

## 글 쓰는 법 (Adding a post)

1. 비공개 정본은 형제 저장소 `../arti1117.github.io.private/drafts/YYYY-MM-DD-slug.md`에 만들고 커밋한다. 앞머리(front matter):

   ```yaml
   ---
   title: 글 제목
   date: 2026-06-21 09:00:00 +0900
   categories: [분산시스템]
   tags: [exactly-once, reliability]
   ---
   ```

2. `tools/preview-docker.sh`로 private `drafts/`를 읽기 전용 마운트해 검토한다. public 저장소에 편집 사본을 만들지 않는다.
3. JY 승인 뒤 private 정본은 그대로 보존하고, 승인된 스냅샷만 `_posts/YYYY-MM-DD-slug.md`에 복사한다. private의 `draft_status`는 `reviewed`로 갱신하고 공개 스냅샷에서는 제거한다. 두 저장소를 자동 동기화하지 않는다.
4. `bash tools/test.sh` 통과 후 public 저장소를 push하면 Actions가 빌드·배포한다.

## 로컬 미리보기 (선택)

Ruby + Bundler 설치 후:

```bash
bundle install
bundle exec jekyll serve   # 공개 스냅샷만 확인
```

비공개 초안까지 확인할 때는 Docker 스크립트를 사용한다. 기본 경로는 `../arti1117.github.io.private/drafts/`이며, 필요하면 `BLOG_PRIVATE_DRAFTS_DIR`로 바꿀 수 있다.

```bash
tools/preview-docker.sh    # http://127.0.0.1:4000
```

## 배포

- `master` 브랜치 push → `.github/workflows/pages-deploy.yml` 가 자동 빌드·배포.
- Pages source = **GitHub Actions** (deploy-from-branch 아님).
- 옛 정적 포트폴리오는 `legacy` 브랜치에 보존됨.

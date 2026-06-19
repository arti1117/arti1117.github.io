# arti1117.github.io

Personal tech blog — built on [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) (Jekyll), deployed to GitHub Pages via GitHub Actions.

Distributed-systems & autonomous-system reliability notes. Korean body + English summaries.

## 글 쓰는 법 (Adding a post)

1. `_posts/YYYY-MM-DD-slug.md` 파일을 만든다. 앞머리(front matter):

   ```yaml
   ---
   title: 글 제목
   date: 2026-06-21 09:00:00 +0900
   categories: [분산시스템]
   tags: [exactly-once, reliability]
   ---
   ```

2. 마크다운 본문 작성 → `git push` → Actions가 빌드·배포(약 2~3분) → <https://arti1117.github.io> 반영.
3. 작성 중인 글은 `_drafts/`에 두면 배포되지 않는다 (`_posts/`로 옮기면 발행).

## 로컬 미리보기 (선택)

Ruby + Bundler 설치 후:

```bash
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000
```

## 배포

- `master` 브랜치 push → `.github/workflows/pages-deploy.yml` 가 자동 빌드·배포.
- Pages source = **GitHub Actions** (deploy-from-branch 아님).
- 옛 정적 포트폴리오는 `legacy` 브랜치에 보존됨.

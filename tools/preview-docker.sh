#!/usr/bin/env bash
# 로컬 프리뷰 — 호스트에 Ruby 없이 Docker로 Jekyll 실행 (http://localhost:4000)
# gems는 vendor/bundle(.gitignore됨)에 캐시되어 두 번째 실행부터 빠르다.
# _drafts/ 포함 렌더링(--drafts) — 발행 전 초안 확인용.
set -eu
cd "$(dirname "$0")/.."
docker run --rm -it \
  -e BUNDLE_PATH=vendor/bundle \
  -v "$PWD":/srv/jekyll -w /srv/jekyll \
  -p 4000:4000 -p 35729:35729 \
  ruby:3.4 \
  bash -c "bundle install --quiet && exec bundle exec jekyll serve --host 0.0.0.0 --drafts --livereload"

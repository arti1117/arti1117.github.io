#!/usr/bin/env bash
# 로컬 프리뷰 — 호스트에 Ruby 없이 Docker로 Jekyll 실행 (http://localhost:4000)
# gems는 vendor/bundle(.gitignore됨)에 캐시되어 두 번째 실행부터 빠르다.
# 형제 private 저장소의 tracked drafts를 읽기 전용으로 마운트해 렌더링한다.
set -eu
cd "$(dirname "$0")/.."
private_drafts_dir="${BLOG_PRIVATE_DRAFTS_DIR:-../arti1117.github.io.private/drafts}"
if [ ! -d "$private_drafts_dir" ]; then
  echo "private drafts directory not found: $private_drafts_dir" >&2
  exit 1
fi
private_drafts_dir="$(cd "$private_drafts_dir" && pwd -P)"
docker run --rm -it \
  -e BUNDLE_PATH=vendor/bundle \
  -v "$PWD":/srv/jekyll -w /srv/jekyll \
  -v "$private_drafts_dir":/srv/jekyll/_drafts:ro \
  -p 4000:4000 -p 35729:35729 \
  ruby:3.4 \
  bash -c "bundle install --quiet && exec bundle exec jekyll serve --host 0.0.0.0 --drafts --livereload"

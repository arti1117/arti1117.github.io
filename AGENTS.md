# Repository Instructions

This file provides repository-specific instructions for coding agents and human contributors.

Jekyll/Chirpy blog → GitHub Pages. Default branch **master**. Workspace-level rules (publication boundary, single-copy rule, honesty constraints) live in `../AGENTS.md` and apply to everything here.

## Build & test

Chirpy is a **pinned gem** (`jekyll-theme-chirpy = 7.6.0`), not a fork. `_includes/head.html` and `_includes/sidebar.html` are hand-copied from 7.6.0's markup — **re-sync both before bumping the gem**, or the layout silently diverges. Other overrides: `_plugins/posts-lastmod-hook.rb`, `_data/{contact,share}.yml`, `_tabs/*.md`.

- Release gate: `bash tools/test.sh` (production build + htmlproofer, identical to CI) — runs locally in ~3s. Run it before pushing content or layout changes.
- Local Ruby is 3.2 (CI builds on 3.4); gems are project-local (`.bundle/config` → `vendor/bundle`, both gitignored). Preview and other commands: README.md.

## Deploy gotchas (not visible from a green/red run alone)

- The `indexnow` job is `continue-on-error` — a failed search-engine ping must not redden a good deploy. Its key is **public by design** (served at the site root), not a leaked secret.
- CI htmlproofer runs `--disable-external`; external link rot is caught separately by `link-check.yml` (lychee, weekly Sat 06:00 KST). A red link-check means content links rotted, not that the build broke.
- Pages source = GitHub Actions, not deploy-from-branch. Old static portfolio is preserved on the `legacy` branch.

## Posts

Front-matter format: README.md. Five categories: 인공지능 · 로봇 · 분산시스템 · 학습기록 · 신뢰성. Korean body + English summary. Permalink `/posts/:title/`; giscus comments + TOC on for posts, off for drafts. `_drafts/` is gitignored (machine-local); publishing = `git mv` into `_posts/YYYY-MM-DD-slug.md`. Audience: "the person stuck on this question, including past me" — write to help, not to impress.

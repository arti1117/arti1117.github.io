# frozen_string_literal: true

source "https://rubygems.org"

# Pinned: _includes/sidebar.html and _includes/head.html are overridden to
# match 7.6.0's markup. Re-sync those overrides before bumping this version.
gem "jekyll-theme-chirpy", "= 7.6.0"

gem "html-proofer", "~> 5.0", group: :test

platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:windows]

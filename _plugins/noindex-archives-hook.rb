#!/usr/bin/env ruby
# frozen_string_literal: true

# Exclude generated category/tag archive pages from search indexing and sitemap.

Jekyll::Hooks.register :site, :pre_render do |site|
  site.pages.each do |page|
    next unless %w[category tag].include?(page.data['layout'])

    page.data['sitemap'] = false
    page.data['robots'] = 'noindex, follow'
  end
end

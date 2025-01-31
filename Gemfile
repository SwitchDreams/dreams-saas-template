# frozen_string_literal: true

source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.0.0"

# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem "propshaft"

# Use pg as the database for Active Record
gem "pg", "~> 1.1"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:windows, :jruby]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: [:mri, :windows], require: "debug/prelude"

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem "brakeman", require: false

  gem "rspec-rails"
  gem "factory_bot_rails"
  gem "switchcop"
  gem "simplecov"
  gem "faker"
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
end

# About An authentication system generator for Rails applications.
gem "authentication-zero"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
gem "bcrypt", "~> 3.1.7"

# ⚡️ Vite.js in Ruby, bringing joy to your JavaScript experience
gem "vite_rails"

# The Rails adapter for Inertia.js.
gem "inertia_rails"

# Build Ruby on Rails apps 10x faster
gem "avo"

# Simple Rails app configuration
gem "figaro"

#  High Performance JSON Serialization for ActiveRecord & Ruby Objects
gem "panko_serializer"

# Authorization framework for Ruby/Rails applications.
gem "action_policy"

# Thruster is an HTTP/2 proxy for simple production-ready deployments of Rails applications.
gem "thruster"

# Multithreaded, Postgres-based, Active Job backend for Ruby on Rails.
gem "good_job"

# Mailer
gem "sendgrid-ruby"

# Protection against abusive requests
gem "rack-attack"

# A collection of extensions, developer tools, and the community documentation for Inertia's Rails adapter.
gem "inertia_rails-contrib"

# Just the right amount of Rails eager loading
gem "goldiloader"

# OmniAuth
gem "omniauth"
gem "omniauth-rails_csrf_protection"
gem "omniauth-google-oauth2"

# frozen_string_literal: true

# config/initializers/inertia.rb

InertiaRails.configure do |config|
  # Example: force a full-reload if the deployed assets change.
  config.version = ViteRuby.digest
  config.always_include_errors_hash = true
end

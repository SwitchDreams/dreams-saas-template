# frozen_string_literal: true

require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
# require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DreamsSaasTemplate
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.2

    config.time_zone = "Brasilia"
    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: ["assets", "tasks"])

    config.i18n.default_locale = :"pt-BR"
    config.i18n.available_locales = [:en, :"pt-BR"]

    config.active_job.queue_adapter = :good_job
    # Don't generate system test files.
    config.generators.system_tests = nil

    def credentials_or_env(string_key, default: nil, preference: :env)
      credentials_key = string_key.downcase.to_sym

      if preference == :env
        ENV[string_key] || credentials.dig(credentials_key) || default
      else
        credentials.dig(credentials_key) || ENV.fetch(string_key, default)
      end
    end

    # Sendgrid configuration
    config.action_mailer.smtp_settings = {
      user_name: "apikey", # This is the string literal 'apikey', NOT the ID of your API key
      password: credentials_or_env("SENDGRID_API_KEY", default: ""),
      domain: "switchdreams.com.br",
      address: "smtp.sendgrid.net",
      port: 587,
      authentication: :plain,
      enable_starttls_auto: true,
    }
  end
end

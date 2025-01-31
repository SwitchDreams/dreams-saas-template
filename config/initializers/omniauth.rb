# frozen_string_literal: true

Rails.application.config.middleware.use OmniAuth::Builder do
  configure do |config|
    config.path_prefix = "/auth"
    config.logger = Rails.logger if Rails.env.development?
  end

  provider :google_oauth2,
    Rails.application.credentials_or_env("GOOGLE_CLIENT_ID", default: "chaveTeste"),
    Rails.application.credentials_or_env("GOOGLE_CLIENT_SECRET", default: "chaveTeste"),
    {
      scope: "email, profile",
      prompt: "select_account",
      image_aspect_ratio: "square",
      image_size: 200,
      provider_ignores_state: true,
    }
end

OmniAuth.config.allowed_request_methods = [:get]

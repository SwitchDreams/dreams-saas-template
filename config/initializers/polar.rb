# frozen_string_literal: true

# Configuration for Polar.sh payment and subscription integration
module Polar
  # API Configuration
  mattr_accessor :api_key
  mattr_accessor :webhook_secret
  mattr_accessor :api_base_url
  mattr_accessor :subscription_price

  # Subscription Configuration
  SUBSCRIPTION_PRICE_BRL = 10.00
  SUBSCRIPTION_CURRENCY = "BRL"

  # Initialize configuration
  def self.setup
    self.api_key = Rails.application.credentials_or_env("POLAR_API_KEY")
    self.webhook_secret = Rails.application.credentials_or_env("POLAR_WEBHOOK_SECRET")
    self.subscription_price = SUBSCRIPTION_PRICE_BRL

    # Set API URL based on environment
    self.api_base_url = if Rails.env.production?
      "https://api.polar.sh/v1"
    else
      "https://api.sandbox.polar.sh/v1"
    end

    # Raise error if required credentials are missing
    raise "Polar API key is required" if api_key.blank?
    raise "Polar webhook secret is required" if webhook_secret.blank?
  end
end

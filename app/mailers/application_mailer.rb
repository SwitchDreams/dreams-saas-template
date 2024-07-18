# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.credentials_or_env(
    "SENDGRID_SENDER_EMAIL", default: "default"
  )
  layout "mailer"
end

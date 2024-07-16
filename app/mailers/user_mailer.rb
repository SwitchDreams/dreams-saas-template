# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def password_reset
    @user = params[:user]
    @code = @user.password_reset_tokens.create!(code: rand(100_000..999_999)).code

    mail to: @user.email, subject: "Recuperar sua senha"
  end

  def email_verification
    @user = params[:user]
    @signed_id = @user.generate_token_for(:email_verification)

    mail to: @user.email, subject: "Verifique seu e-mail"
  end
end

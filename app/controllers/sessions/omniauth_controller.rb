# frozen_string_literal: true

class Sessions::OmniauthController < ApplicationController
  skip_before_action :authenticate

  def create
    user = User.find_by(email: user_params[:email])
    user = User.create!(user_params.except(:provider, :uid).merge(
      password: SecureRandom.base58,
    )) unless user
    @session = user.sessions.create!
    cookies.signed.permanent[:session_token] = { value: @session.id, httponly: true }
    redirect_to root_path
  rescue StandardError => e
    redirect_to login_path, inertia: { errors: e.message }
  end

  def failure
    redirect_to login_path, alert: params[:message]
  end

  private

  def user_params
    { email: omniauth.info.email, name: omniauth.info.name, provider: omniauth.provider, uid: omniauth.uid }
  end

  def omniauth
    request.env["omniauth.auth"]
  end
end

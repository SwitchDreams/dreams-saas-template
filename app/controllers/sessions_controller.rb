# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authenticate, only: [:new, :create]
  skip_before_action :verify_authenticity_token

  before_action :set_session, only: :destroy

  def new
    render inertia: "Sessions/New"
  end

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      @session = user.sessions.create!
      cookies.signed.permanent[:session_token] = { value: @session.id, httponly: true }

      redirect_to projects_path
    else
      redirect_to sign_in_path, inertia: { errors: "Credenciais Inválidas" }
    end
  end

  def destroy
    @session.destroy
    redirect_to sign_in_path
  end

  private

  def set_session
    @session = Current.session
  end
end

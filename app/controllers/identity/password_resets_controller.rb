# frozen_string_literal: true

class Identity::PasswordResetsController < ApplicationController
  skip_before_action :authenticate

  def step_one
    render inertia: "Identity/PasswordResets/StepOne"
  end

  # Second Step - Use the code in email
  def create
    @user = User.find_by!(email: params[:email])
    send_reset_password_instructions

    @signed_id = @user.password_reset_tokens.last.signed_id(expires_in: 20.minutes)

    redirect_to identity_password_resets_step_two_path(sid: @signed_id)
  rescue => e
    error_message = if e.is_a?(ActiveRecord::RecordNotFound)
      "não foi possível encontrar usuário com o email: #{params[:email]}"
    else
      e.message
    end
    redirect_to identity_password_resets_step_one_path,
      inertia: { errors: "Ocorreu um erro: #{error_message}" }
  end

  def step_two
    if params[:sid]
      render inertia: "Identity/PasswordResets/StepTwo", props: { sid: params[:sid] }
    else
      redirect_to identity_password_resets_step_one_path
    end
  end

  # Third Step - Edit password
  def check_code
    token = PasswordResetToken.find_signed!(params[:sid])
    if token.code == params[:code].to_i
      redirect_to identity_password_resets_step_three_path(sid: params[:sid], code: params[:code])
    else
      redirect_to identity_password_resets_step_two_path(sid: params[:sid]),
        inertia: { errors: "O código fornecido está errado" }
    end
  rescue => e
    redirect_to identity_password_resets_step_two_path(sid: params[:sid]), inertia: { errors: "Ocorreu um erro: #{e}" }
  end

  def step_three
    if params[:sid] && params[:code]
      render inertia: "Identity/PasswordResets/StepThree", props: { sid: params[:sid], code: params[:code] }
    else
      redirect_to identity_password_resets_step_two_path(sid: params[:sid])
    end
  end

  # Fourth Step - Update password
  def update
    token = PasswordResetToken.find_signed!(params[:sid])
    if token.code == params[:code].to_i
      token.user.update!(password: params[:password])
      redirect_to identity_password_resets_step_four_path
    else
      redirect_to identity_password_resets_step_two_path(sid: params[:sid], code: params[:code])
    end
  rescue => e
    redirect_to identity_password_resets_step_three_path(sid: params[:sid], code: params[:code]),
      inertia: { errors: "Ocorreu um erro: #{e}" }
  end

  def step_four
    render inertia: "Identity/PasswordResets/StepFour"
  end

  private

  def send_reset_password_instructions
    UserMailer.with(user: @user).password_reset.deliver_now
  end
end

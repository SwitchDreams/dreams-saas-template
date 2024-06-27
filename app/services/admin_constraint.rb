# frozen_string_literal: true

class AdminConstraint
  def matches?(request)
    session_record = if request.cookie_jar.signed[:session_token]
      Session.find_by(id: request.cookie_jar.signed[:session_token])
    end
    session_record&.user&.super_admin?
  end
end

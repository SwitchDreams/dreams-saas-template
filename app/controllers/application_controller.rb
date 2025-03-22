# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_current_request_details
  before_action :authenticate

  inertia_share currentUser: -> { Current.user ? serialize(Current.user, CurrentUserSerializer) : nil }

  private

  def current_user
    Current.user
  end

  def serialize(resource, serializer_class)
    if resource.respond_to?(:length)
      Panko::ArraySerializer.new(resource, each_serializer: serializer_class).to_a
    else
      serializer_class.new.serialize(resource)
    end
  end

  def authenticate
    if (session_record = Session.find_by(id: cookies.signed[:session_token]))
      Current.session = session_record
    else
      redirect_to sign_in_path
    end
  end

  def set_current_request_details
    Current.user_agent = request.user_agent
    Current.ip_address = request.ip
  end
end

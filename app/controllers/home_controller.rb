# frozen_string_literal: true

class HomeController < ApplicationController
  skip_before_action :authenticate
  def index
    user = session_record&.user
    render inertia: "Home/Index", props: {
      user: user,
    }
  end
end

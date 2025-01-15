# frozen_string_literal: true

class UsersController < ApplicationController
  def edit
    render inertia: "Users/Edit"
  end

  def update
    if Current.user.update(user_params)
      redirect_to edit_profile_path, notice: "Profile updated successfully"
    else
      render inertia: "Users/Edit", inertia_errors: Current.user.errors
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
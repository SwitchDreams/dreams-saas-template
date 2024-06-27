# frozen_string_literal: true

require "rails_helper"

RSpec.describe SessionsController, type: :request do
  describe "GET /sign_in" do
    it "returns ok status" do
      get "/sign_in"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /sign_in" do
    context "with valid credentials" do
      it "returns created status" do
        user = create(:user)
        post "/sign_in",
          params: { email: user.email, password: user.password }
        expect(response).to have_http_status(:found)
      end
    end

    context "with invalid credentials" do
      it "returns unauthorized status" do
        user = create(:user)
        post "/sign_in",
          params: { user: { email: user.email, password: "" } }
        expect(response).to redirect_to(login_path)
      end
    end
  end
end

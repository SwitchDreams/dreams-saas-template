# frozen_string_literal: true

require "rails_helper"

def login_with_google_oauth
  OmniAuth.config.test_mode = true
  OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new(Faker::Omniauth.google)
  Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]
end

RSpec.describe Sessions::OmniauthController, type: :request do
  describe "GET /auth/google_oauth2/" do
    context "when user is new" do
      it "creates an user and redirects the user" do
        login_with_google_oauth
        get "/auth/google_oauth2/callback"
        expect(response).to have_http_status(:redirect)
        assert_redirected_to root_path

        expect(User.all.size).to eq(1)
      end
    end

    context "when existing user" do
      it "does not create an user but redirects the user" do
        create(:user, name: "Tony Stark", email: "tony@stark.com")

        OmniAuth.config.test_mode = true
        OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new({
          provider: "google_oauth2",
          uid: "123456789",
          info: {
            name: "Tony Stark",
            email: "tony@stark.com",
          },
          credentials: {
            token: "token",
            refresh_token: "refresh token",
          },
        })
        Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]
        get "/auth/google_oauth2/callback"
        expect(response).to have_http_status(:redirect)
        assert_redirected_to root_path

        expect(User.all.size).to eq(1)
      end
    end

    context "when OAuth2 API error" do
      it "does not creates session and redirects user" do
        OmniAuth.config.test_mode = true
        OmniAuth.config.mock_auth[:google_oauth2] = :invalid_credentials
        Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:google_oauth2]

        get "/auth/google_oauth2/callback"
        expect(response).to have_http_status(:redirect)
        assert_redirected_to "http://www.example.com/auth/failure?message=invalid_credentials&strategy=google_oauth2"

        expect(Session.all.size).to eq(0)
      end
    end
  end

  describe "GET /auth/failure" do
    context "when OAuth2 API Fails and user gets redirected" do
      it "redirects back to login path" do
        get "/auth/failure"
        expect(response).to have_http_status(:redirect)
        assert_redirected_to login_path
      end
    end
  end
end

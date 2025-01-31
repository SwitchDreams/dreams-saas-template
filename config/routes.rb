# frozen_string_literal: true

Rails.application.routes.draw do
  mount Avo::Engine, at: Avo.configuration.root_path
  mount GoodJob::Engine => "good_job", constraints: AdminConstraint.new

  # Authentication
  get "sign_in", to: "sessions#new", as: :login
  post "sign_in", to: "sessions#create"
  delete "sign_out", to: "sessions#destroy", as: :logout

  get "/auth/:provider/callback", to: "sessions/omniauth#create"
  get "/auth/failure", to: "sessions/omniauth#failure"

  # Password Reset
  namespace :identity do
    get "password_resets/step_one", to: "password_resets#step_one"
    post "password_resets", to: "password_resets#create"
    get "password_resets/step_two", to: "password_resets#step_two"
    post "password_resets/check_code", to: "password_resets#check_code"
    get "password_resets/step_three", to: "password_resets#step_three"
    patch "password_resets", to: "password_resets#update"
    get "password_resets/step_four", to: "password_resets#step_four"
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  root "home#index"
end

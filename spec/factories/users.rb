# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { "Pedro" }
    email { Faker::Internet.unique.email }
    password { "123456" }
    role { "normal" }
  end
end

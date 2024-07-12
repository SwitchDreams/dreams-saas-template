FactoryBot.define do
  factory :password_reset_token do
    user { nil }
    code { 1 }
  end
end

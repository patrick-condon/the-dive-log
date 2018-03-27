require 'factory_bot'

FactoryBot.define do
  factory :user do
    username 'username'
    first_name 'Jim'
    last_name 'Halpert'
    sequence(:email) {|n| "user#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
  end

end

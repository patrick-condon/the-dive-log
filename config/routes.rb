Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" } 
  root 'dives#index'

  resources :users, only: [:index, :show]
end

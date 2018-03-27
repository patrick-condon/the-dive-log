Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  root 'log_entries#index'

  resources :users, only: [:index, :show]
  resources :log_entries, only: [:index, :show]
  resources :divesites, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :log_entries, only: [:index, :show]
    end
  end
end

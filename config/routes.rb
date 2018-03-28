Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  root 'log_entries#index'

  resources :users, only: [:index, :show]
  resources :log_entries, only: [:index, :show, :new]
  resources :divesites, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :log_entries, only: [:index, :show, :create]
      resources :divesites, only: [:index]
    end
  end
end

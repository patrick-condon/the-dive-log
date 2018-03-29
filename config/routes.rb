Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  root 'static_pages#index'

  resources :users, only: [:index, :show]
  resources :log_entries, only: [:new, :show]

  namespace :api do
    namespace :v1 do
      resources :log_entries, only: [:index, :show, :create, :update]
      resources :divesites, only: [:index]
    end
  end
end

Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users, controllers: { registrations: "registrations" }

  resources :users, only: [:show]
  resources :log_entries, only: [:index, :show, :new]
  resources :divesites, only: [:new, :show]

  namespace :api do
    namespace :v1 do
      resources :log_entries, only: [:index, :show, :create, :update]
      resources :divesites, only: [:index, :show, :create]
    end
  end
  get '*path', to: 'static_pages#index'
end

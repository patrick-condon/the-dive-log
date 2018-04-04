Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users, controllers: { registrations: "registrations" }

  resources :users, only: [:show]
  resources :log_entries, only: [:index, :show, :new] do
    resources :photos, only: [:new]
  end
  resources :divesites, only: [:new, :show]

  namespace :api do
    namespace :v1 do
      resources :log_entries, only: [:index, :show, :create, :update] do
        resources :photos, only: [:index, :create]
      end
      resources :divesites, only: [:index, :show, :create]
    end
  end
  get '*path', to: 'static_pages#index'
end

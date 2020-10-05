Rails.application.routes.draw do
  resources :reservations
  resources :users
  resources :listings
  post '/login', to: 'auth#create'
  get '/profile', to: 'users#profile'
  post '/thirdpartylogin', to: 'auth#third_party'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

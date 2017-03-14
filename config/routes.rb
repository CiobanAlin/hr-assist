Rails.application.routes.draw do

  mount V1::UserAPI => '/api'
  mount V1::ProjectAPI => '/api'
  mount V1::CustomerAPI => '/api'
  mount V1::TechnologyAPI => '/api'
  mount V1::IndustryAPI => '/api'
  mount V1::ActivityAPI => '/api'
  mount V1::ApplicationTypeAPI => '/api'
  devise_for :users


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

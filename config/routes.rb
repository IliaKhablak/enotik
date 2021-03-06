Rails.application.routes.draw do

	root 'users#index'
  post '/users/create' => 'users#create'
  post 'users/new' => 'users#new'
  get '/show' => 'users#show'
  get '/log_out' => 'users#delete'
  post '/update' => 'users#update'
  post '/update1' => 'users#update1'
  post '/update2' => 'users#update2'
  post '/check' => 'users#check'
  post '/add_image' => 'images#create'
  get '/feed' => 'images#show'
  get '/delete' => 'images#delete'
  get '/like' => 'images#like'
  get '/like1' => 'images#like1'
  get '/index2/:id' => 'users#index2'
  get '/show1' => 'images#show1'
  get '/show2' => 'images#show2'
  post '/add_comm' => 'images#add_comm'
  get '/comments' => 'images#comments'
  get '/frendlist' => 'users#frendlist'
  get '/frendlist1' => 'users#frendlist1'
  post '/follow' => 'users#follow'
  post '/unfollow' => 'users#unfollow'
  get '/message1' => 'users#message1'
  post '/message2' => 'users#message2'
  get '/direct' => 'users#direct'
  get '/new_message' => 'users#new_message'
  get '/message3' => 'users#message3'
  get '/search' => 'users#search'
  post '/fogot_pass' => 'users#fogot_pass'
end

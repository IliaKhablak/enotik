class UsersController < ApplicationController
	respond_to :html, :json, :js
	
	def index
		if session[:user_id] == nil
		else
			@a = User.find(session[:user_id])
		end
	end

	def index2
		if session[:user_id] == nil
			redirect_to root_url
		else
			@a = User.find(params[:id])
		end
	end

	def new
		@a = User.find_by(email: params[:user][:email])
		if @a && @a.authenticate(params[:user][:password])
      		session[:user_id] = @a.id
      		session[:username] = @a.email
      		redirect_to root_url
    	else
      		redirect_to root_url
    	end
	end

	def create
		@a = User.new(users_params)
		if @a.save
			session[:user_id] = @a.id
			session[:username] = @a.email
			redirect_to root_url
		end
	end

	def show
		@a = User.find(session[:user_id])
		render :json => @a
	end

	def delete
		session[:user_id] = nil
		session[:username] = nil
		redirect_to root_url
	end

	def update
		@a = User.find(session[:user_id])
		@a["#{params.first[0]}"] = params.first[1]
		if @a.save!
			render :json => ["ok"]
		else
			render :json => ["no"]
		end
	end

	def update1
		@a = User.find(session[:user_id])
		@a.avatar = params[:user][:avatar]
		@a.save
	end

	def update2
		@a = User.find(session[:user_id])
		@a.password = params.first[1]
		if @a.save!
			render :json => ["ok"]
		else
			render :json => ["no"]
		end
	end

	def check
		@a = User.find(session[:user_id])
		if @a.authenticate(params['password'])
			render :json => ["ok"]
		else
			render :json => ["no"]
		end
	end

	def follow
		a = User.find(session[:user_id])
		b = User.find(params['id'].to_i)
		if a.follow.include?(params['id'])
			render :json => ["no"]
		else
			b.subscribers << session[:user_id]
			a.follow << params['id']
			b.save
			a.save
			render :json => ["ok"]
		end
	end

	def unfollow
		a = User.find(session[:user_id])
		b = User.find(params['id'].to_i)
		if a.follow.include?(params['id'])
			b.subscribers.delete(session[:user_id].to_s)
			a.follow.delete(params['id'])
			b.save
			a.save
			render :json => ["ok"]
		else
			render :json => ["no"]
		end
	end

	def frendlist
		arr = []
		a = User.find_each do |x|
			if x.subscribers.include?(session[:user_id].to_s)
				arr << x
			end
		end
		render :json => arr
	end

	def frendlist1
		arr = []
		a = User.find_each do |x|
			if x.follow.include?(session[:user_id].to_s)
				arr << x
			end
		end
		render :json => arr
	end

	def message1
		if session[:user_id] > params['id'].to_i
			x = params['id'].to_i
			y = session[:user_id]
		else
			y = params['id'].to_i
			x = session[:user_id]
		end
		if Dialog.where(user_id: x).find_by(opponent_id: y) != nil
			a = Dialog.where(user_id: x).find_by(opponent_id: y)
			if a.summessage1[1] == session[:user_id]
				a.summessage = a.summessage1[0]
			end
			a.save
			b = User.find(params['id'].to_i)
			render :json => [a,b]
		else
			a = "no"
			b = User.find(params['id'].to_i)
			render :json => [a,b]
		end
	end

	def message2
		if session[:user_id] > params['id'].to_i
			x = params['id'].to_i
			y = session[:user_id]
		else
			y = params['id'].to_i
			x = session[:user_id]
		end
		if Dialog.where(user_id: x).find_by(opponent_id: y) != nil
			a = Dialog.where(user_id: x).find_by(opponent_id: y)
			if params['message']=~/{superduperidofimage:\d+}/
				q = eval(params['message'])
				q = q[:superduperidofimage]
				b = Image.find(q)
				a.message << [session[:user_id],b.avatar.url,b.id,b.user_id]
				a.summessage1 = [a.summessage1[0]+1,params['id'].to_i]
				a.save
				render :json => [a]
			else
				a.message << [session[:user_id],params['message'],0,0]
				a.summessage1 = [a.summessage1[0]+1,params['id'].to_i]
				a.save
				render :json => [a]
			end
		else
			a = Dialog.new(user_id: x, opponent_id: y)
			if params['message']=~/{superduperidofimage:\d+}/
				q = eval(params['message'])
				q = q[:superduperidofimage]
				b = Image.find(q)
				a.message << [session[:user_id],b.avatar.url,b.id,b.user_id]
				a.summessage1 = [1,params['id'].to_i]
				a.save
				render :json => [a]
			else
				a.message << [session[:user_id],params['message'],0,0]
				a.summessage1 = [1,params['id'].to_i]
				a.save
				render :json => [a]
			end
		end
	end

	def message3
		sum = 0
		if Dialog.where(user_id: session[:user_id]) != nil
			b = Dialog.where(user_id: session[:user_id])
			b.each do |x|
				if x.summessage1[1] == session[:user_id]
					sum = sum + (x.summessage1[0]-x.summessage)
				end
			end
		end
		if Dialog.where(opponent_id: session[:user_id]) != nil
			b = Dialog.where(opponent_id: session[:user_id])
			b.each do |x|
				if x.summessage1[1] == session[:user_id]
					sum = sum + (x.summessage1[0]-x.summessage)
				end
			end
		end
		render :json => [sum]
	end

	def direct
		arr = []
		if Dialog.where(user_id: session[:user_id]) != nil
			b = Dialog.where(user_id: session[:user_id])
			b.each do |x|
				a = User.where(id: x.opponent_id)
				if a != nil
					if x.summessage1[1] == session[:user_id]
						arr << [a,x.summessage1[0]-x.summessage]
					else
						arr << [a,0]
					end
				end
			end
		end
		if Dialog.where(opponent_id: session[:user_id]) != nil
			b = Dialog.where(opponent_id: session[:user_id])
			b.each do |x|
				a = User.where(id: x.user_id)
				if a != nil
					if x.summessage1[1] == session[:user_id]
						arr << [a,x.summessage1[0]-x.summessage] 
					else
						arr << [a,0]
					end
				end
			end
		end
		render :json => arr
	end

	def new_message
		arr = []
		a = User.find_each do |x|
			if x.follow.include?(session[:user_id].to_s)
				if x.name.downcase =~ /\w{0,}#{params['bla'].downcase}\w{0,}/
					arr << x
				end
			end
		end
		b = User.find_each do |x|
			if x.subscribers.include?(session[:user_id].to_s)
				if arr.include?(x) == false
					if x.name.downcase =~ /\w{0,}#{params['bla'].downcase}\w{0,}/
						arr << x
					end
				end
			end
		end
		render :json => arr
	end

	def search
		arr = []
		a = User.find_each do |x|
			if x.name.downcase =~ /\w{0,}#{params['bla'].downcase}\w{0,}/
				arr << x
			end
		end
		render :json => arr
	end

	def fogot_pass
		a = User.find_by(email: params['email'])
		chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
  		password = ''
  		6.times {password << chars[rand(chars.size)]}
  		a.password = password
  		if a.save
  			UserMailer.mailsend(a,password).deliver_now
  			render :json => ["ok"]
  		else
  			render :json => ["no"]
  		end
	end

	private

	def users_params
		params.require(:user).permit(:name, :description, :email, :password, :avatar, :password_confirmation)
	end
end



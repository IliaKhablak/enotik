class ImagesController < ApplicationController
	
	def create
		@b = Image.new(user_id: session[:user_id], description: params[:image][:description])
		@b.avatar = params[:image][:avatar]
		if @b.save
			redirect_to :back
		else
			redirect_to :back
		end
	end

	def show
		arr = []
		c = User.find(session[:user_id])
		@b = Image.order(created_at: :desc)
		@b.each do |x|
			if c.follow.include?(x.user_id.to_s) || x.user_id == session[:user_id]
				a = User.find(x.user_id)
				arr << [x,a]
			end
		end
		render :json => arr
	end

	def show1
		@b = Image.where(user_id: params['id']).order(created_at: :desc)
		render :json => [@b]
	end

	def show2
		@b = Image.find(params['image_id'])
		@a = User.find(params['user_id'])
		render :json => [@b,@a]
	end

	def delete
		@b = Image.find(params["id"].to_i)
		@b.destroy
		redirect_to root_url
	end

	def like
		@b = Image.find(params['id'].to_i)
		@b.like << session[:user_id].to_s
		@b.save
		render :json => [@b.like.length, @b.id]
	end

	def like1
		@b = Image.find(params['id'].to_i)
		@b.like.delete(session[:user_id].to_s)
		@b.save
		render :json => [@b.like.length, @b.id]
	end

	def add_comm
		@b = Comment.new(image_id: params['id'], user_id: session[:user_id], comment: params['comment'])
		@b.save
		render :json => [@b]
	end

	def comments
		arr = []
		@b = Comment.where(image_id: params['id']).order(created_at: :desc)
		@b.each do |x|
			a = User.find(x.user_id)
			arr << [x,a]
		end
		render :json => arr
	end

	private

	def image_params
		params.require(:image).permit(:description, :avatar)
	end
end

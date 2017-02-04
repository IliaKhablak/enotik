class UserMailer < ApplicationMailer
	default from: 'testairbnb111@gmail.com'

	def mailsend(user,pass)
		@user = user
		@pass = pass
		mail(to: @user.email, subject: 'New password')
	end
end

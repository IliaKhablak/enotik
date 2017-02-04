class User < ActiveRecord::Base
	mount_uploader :avatar, AvatarUploader
	has_secure_password
end

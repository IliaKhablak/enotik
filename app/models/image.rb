class Image < ActiveRecord::Base
	mount_uploader :avatar, AvatarUploader
	store_accessor :comment
end

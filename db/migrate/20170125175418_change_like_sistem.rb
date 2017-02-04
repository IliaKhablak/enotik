class ChangeLikeSistem < ActiveRecord::Migration
  def change
  	remove_column :images, :like
  	add_column :images, :like, :integer, default: [], array: true
  end
end

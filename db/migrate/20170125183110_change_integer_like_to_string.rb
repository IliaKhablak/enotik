class ChangeIntegerLikeToString < ActiveRecord::Migration
  def change
  	remove_column :images, :like
  	add_column :images, :like, :string, default: [], array: true
  end
end

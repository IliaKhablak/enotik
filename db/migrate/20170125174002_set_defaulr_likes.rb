class SetDefaulrLikes < ActiveRecord::Migration
  def change
  	remove_column :images, :like
  	add_column :images, :like, :integer, :null => false, :default => 0
  end
end

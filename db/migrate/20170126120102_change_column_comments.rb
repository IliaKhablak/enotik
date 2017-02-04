class ChangeColumnComments < ActiveRecord::Migration
  def change
  	remove_column :images, :comment
  	add_column :images, :comment, :hstore
  end
end

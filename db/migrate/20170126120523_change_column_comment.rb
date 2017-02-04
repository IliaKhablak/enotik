class ChangeColumnComment < ActiveRecord::Migration
  def change
  	remove_column :images, :comment
  	enable_extension "hstore"
  	add_column :images, :comment, :hstore
  end
end

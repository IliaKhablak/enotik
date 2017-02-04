class AddCommentsToImage < ActiveRecord::Migration
  def change
  	add_column :images, :comment, :string, array: true, default: []
  end
end

class AddIndexToComment < ActiveRecord::Migration
  def change
  	add_index :images, :comment, using: :gin
  end
end

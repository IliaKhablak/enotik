class ChangeFollow < ActiveRecord::Migration
  def change
  	remove_column :users, :follow
  	remove_column :users, :subscribers
  	add_column :users, :follow, :string, array: true, default: []
  	add_column :users, :subscribers, :string, array: true, default: []
  end
end

class AddColumnsFollowAndSubscribers < ActiveRecord::Migration
  def change
  	add_column :users, :follow, :integer, array: true, default: []
  	add_column :users, :subscribers, :integer, array: true, default: []
  end
end

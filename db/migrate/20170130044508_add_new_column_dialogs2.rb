class AddNewColumnDialogs2 < ActiveRecord::Migration
  def change
  	remove_column :dialogs, :summessage, :integer
  	add_column :dialogs, :summessage, :integer, default: 0
  end
end

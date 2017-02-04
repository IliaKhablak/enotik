class AddNewColumnDialogs < ActiveRecord::Migration
  def change
  	add_column :dialogs, :summessage, :integer
  	add_column :dialogs, :summessage1, :integer, array: true, default: []
  end
end

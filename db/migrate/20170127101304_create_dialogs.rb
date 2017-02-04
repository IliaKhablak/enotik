class CreateDialogs < ActiveRecord::Migration
  def change
    create_table :dialogs do |t|
      t.integer :user_id
      t.integer :opponent_id
      t.string :message, default: [], array: true

      t.timestamps null: false
    end
  end
end

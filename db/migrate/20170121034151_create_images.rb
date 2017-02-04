class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :user_id, :null => false
      t.string :avatar, :null => false
      t.integer :like

      t.timestamps null: false
    end
  end
end

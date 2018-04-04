class CreatePhotos < ActiveRecord::Migration[5.1]
  def change
    create_table :photos do |t|
      t.integer :log_entry_id, null: false
      t.integer :divesite_id, null: false
      t.integer :user_id, null: false
      t.string :dive_photo, null: false
      t.string :description
      t.timestamps
    end
  end
end

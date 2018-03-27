class CreateDives < ActiveRecord::Migration[5.1]
  def change
    create_table :dives do |t|
      t.integer :divesite_id, null: false
      t.integer :user_id, null: false
      t.date :date, null: false
      t.text :comments, null: false
      t.integer :dive_number, default: ''
      t.integer :max_depth, default: ''

      t.timestamps
    end
  end
end

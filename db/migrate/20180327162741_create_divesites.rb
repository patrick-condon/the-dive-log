class CreateDivesites < ActiveRecord::Migration[5.1]
  def change
    create_table :divesites do |t|
      t.string :name, null: false
      t.integer :lat, null: false
      t.integer :lng, null: false

      t.timestamps
    end
  end
end

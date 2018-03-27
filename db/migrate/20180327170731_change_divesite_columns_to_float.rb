class ChangeDivesiteColumnsToFloat < ActiveRecord::Migration[5.1]
  def up
    change_column :divesites, :lat, :float, null: false
    change_column :divesites, :lng, :float, null: false
  end
  def down
    change_column :divesites, :lat, :integer, null: false
    change_column :divesites, :lng, :integer, null: false
  end
end

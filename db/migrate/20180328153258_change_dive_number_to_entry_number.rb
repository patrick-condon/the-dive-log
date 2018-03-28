class ChangeDiveNumberToEntryNumber < ActiveRecord::Migration[5.1]
  def up
    rename_column :log_entries, :dive_number, :entry_number
    change_column :log_entries, :entry_number, :integer, default: 0
  end
  def down
    rename_column :log_entries, :entry_number, :dive_number
    change_column :log_entries, :dive_number, :integer
  end
end

class AddFieldsToLogEntries < ActiveRecord::Migration[5.1]
  def change
    add_column :log_entries, :metric, :boolean, default: false
    add_column :log_entries, :dive_length, :integer
    add_column :log_entries, :water_temp, :integer
    add_column :log_entries, :visibility, :integer
  end
end

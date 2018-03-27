class RenameDivesToLogEntries < ActiveRecord::Migration[5.1]
  def change
    rename_table :dives, :log_entries
  end
end

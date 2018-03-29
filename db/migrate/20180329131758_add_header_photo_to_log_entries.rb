class AddHeaderPhotoToLogEntries < ActiveRecord::Migration[5.1]
  def change
    add_column :log_entries, :header_photo, :string
  end
end

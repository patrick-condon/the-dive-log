class AddRotationToPhotos < ActiveRecord::Migration[5.1]
  def change
    add_column :photos, :rotation, :integer, null: false, default: 0
  end
end

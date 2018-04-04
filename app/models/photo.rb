class Photo < ApplicationRecord
  belongs_to :log_entry
  belongs_to :divesite
  belongs_to :user

  mount_base64_uploader :dive_photo, DivePhotoUploader

  validates_presence_of :divesite_id, :user_id, :log_entry_id
end

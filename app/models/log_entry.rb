# ruby model for dive object
class LogEntry < ApplicationRecord
  belongs_to :user
  belongs_to :divesite
  has_many :photos

  mount_base64_uploader :header_photo, HeaderPhotoUploader

  validates_presence_of :divesite_id, :user_id, :date, :comments
end

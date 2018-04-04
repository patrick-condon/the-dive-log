# ruby model for user object
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  CERT_LEVELS = [
    ['Bubble Watcher', 'Bubble Watcher'],
    ['Open Water Diver', 'Open Water Diver'],
    ['Advanced Open Water Diver', 'Advanced Open Water Diver'],
    ['Rescue Diver', 'Rescue Diver'],
    ['Master Scuba Diver', 'Master Scuba Diver'],
    ['Divemaster', 'Divemaster'],
    ['Open Water Scuba Instructor', 'Open Water Scuba Instructor'],
    ['Master Scuba Diver Trainer', 'Master Scuba Diver Trainer'],
    ['IDC Staff Instructor', 'IDC Staff Instructor'],
    ['Master Scuba Instructor', 'Master Scuba Instructor'],
    ['Course Director', 'Course Director']
  ].freeze

  has_many :log_entries
  has_many :photos
  has_many :divesites, through: :log_entries

  validates :username, presence: true, uniqueness: true

  validates_presence_of :first_name, :last_name

  mount_uploader :profile_photo, ProfilePhotoUploader

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end

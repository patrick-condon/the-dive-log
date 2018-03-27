# ruby model for user object
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :log_entries
  has_many :divesites, through: :log_entries

  validates :username, presence: true, uniqueness: true

  validates_presence_of :first_name, :last_name

  mount_uploader :profile_photo, ProfilePhotoUploader

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end

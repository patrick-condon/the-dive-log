# ruby model for divesite object
class Divesite < ApplicationRecord
  has_many :log_entries
  has_many :photos
  has_many :users, through: :log_entries

  validates_presence_of :name, :lat, :lng
end

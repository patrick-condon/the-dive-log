class Dive < ApplicationRecord
  belongs_to :user

  validates_presence_of :divesite_id, :user_id, :date, :comments
end

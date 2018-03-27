# ruby model for dive object
class LogEntry < ApplicationRecord
  belongs_to :user
  belongs_to :divesite

  validates_presence_of :divesite_id, :user_id, :date, :comments
end

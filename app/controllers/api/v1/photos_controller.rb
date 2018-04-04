# api endpoint for uploading photos
class Api::V1::PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: %i[index]

  def create
    entry = LogEntry.find(params[:log_entry_id])
    user = current_user
    site = entry.divesite
    photo = params[:dive_photo]
    Photo.create!(
      log_entry_id: entry.id,
      user_id: user.id,
      divesite_id: site.id,
      dive_photo: photo
    )
    render json: { log_entry: entry }
  end
end

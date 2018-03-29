# api endpoint for log_entries
class Api::V1::LogEntriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: %i[index]

  def index
    log_entries = LogEntry.all.order(:created_at).reverse
    sites = get_sites(log_entries)
    render json: { log_entries: log_entries, sites: sites }
  end

  def show
    log_entry = LogEntry.find(params[:id])
    user = {}
    @author = User.find(log_entry.user_id)
    site = Divesite.find(log_entry.divesite_id)
    if current_user
      user = current_user
    end
    get_picture(@author)
    unless log_entry.header_photo.model.header_photo_url.nil?
      header_photo_url = log_entry.header_photo.model.header_photo_url
    end
    # binding.pry
    render json: { log_entry: log_entry, user: user, site: site,
                   author: @author, photo_address: @photo_address,
                   header_photo: header_photo_url}
  end

  def create
    if current_user
      new_log_entry = LogEntry.new(log_entry_params)
      prev_entry = LogEntry.where(user_id: new_log_entry.user_id).last
      if prev_entry
        prev_entry_number = prev_entry.entry_number
      else
        prev_entry_number = 0
      end
      new_log_entry.entry_number = prev_entry_number + 1
      new_log_entry.save!
      render json: { log_entry: new_log_entry }
    end
  end

  def update
    entry = LogEntry.find(params[:id])
    entry.header_photo = params['header_photo']
    if entry.save
      header_photo_url = entry.header_photo.model.header_photo_url
      render json: { header_photo: header_photo_url }
    end
  end

  private

  def log_entry_params
    params.require(:log_entry).permit(
      :divesite_id, :user_id, :date, :comments, :dive_number, :max_depth,
      :header_photo
    )
  end

  def get_sites(log_entries)
    log_entries = log_entries
    sites = []
    log_entries.each do |entry|
      unless sites.include?(entry.divesite)
        sites << entry.divesite
      end
    end
    return sites
  end

  def get_picture(author)
    if @author.profile_photo.model.profile_photo_url.nil?
      @photo_address =
        'https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg'
    else
      @photo_address = @author.profile_photo.model.profile_photo_url
    end
  end
end

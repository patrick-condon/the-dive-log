# api endpoint for log_entries
class Api::V1::LogEntriesController < ApiController
  before_action :authenticate_user!, except: %i[index]

  def index
    log_entries = LogEntry.all.order(:created_at).reverse
    sites = get_sites(log_entries)
    render json: { log_entries: log_entries, sites: sites }
  end

  def show
    log_entry = LogEntry.find(params[:id])
    user = {}
    author = User.find(log_entry.user_id)
    site = Divesite.find(log_entry.divesite_id)
    # if current_user
    #   user = current_user
    # end
    render json: { log_entry: log_entry, user: user, site: site,
                   author: author }
  end

  def create
    if current_user
      new_log_entry = LogEntry.new(log_entry_params)
      prev_entry = LogEntry.where(user_id: current_user.id).last
      if prev_entry
        prev_entry_number = prev_entry.entry_number
      else
        prev_entry_number = 0
      end
      new_log_entry.entry_number = prev_entry_number + 1
      binding.pry
      new_log_entry.save!
      render json: { log_entry: new_log_entry }
    end
  end

  private

  def log_entry_params
    params.require(:log_entry).permit(
      :divesite_id, :user_id, :date, :comments, :dive_number, :max_depth
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
end

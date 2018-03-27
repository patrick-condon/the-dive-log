# api endpoint for log_entries
class Api::V1::LogEntriesController < ApiController
  # before_action :authenticate_user!, except: %i[index]

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

  private

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

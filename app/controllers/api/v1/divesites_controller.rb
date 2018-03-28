# api endpoint for divesites
class Api::V1::DivesitesController < ApiController
  before_action :authenticate_user!

  def index
    user = current_user
    sites = Divesite.all.order(:created_at).reverse
    render json: { sites: sites, user: user }
  end
end

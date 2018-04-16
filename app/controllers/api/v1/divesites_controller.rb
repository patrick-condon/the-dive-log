# api endpoint for divesites
class Api::V1::DivesitesController < ApiController
  before_action :authenticate_user!

  def index
    if current_user
      user = current_user
      sites = Divesite.all.order(:created_at).reverse
      render json: { sites: sites, user: user }
    else
      redirect_to new_user_session_path
    end
  end

  def show
    site = Divesite.find(params[:id])
    render json: { divesite: site }
  end

  def create
    if current_user
      site = Divesite.new(divesite_params)
      if site.save
        render json: { divesite: site }
      end
    end
  end

  private

  def divesite_params
    params.require(:divesite).permit(:name, :lat, :lng)
  end
end

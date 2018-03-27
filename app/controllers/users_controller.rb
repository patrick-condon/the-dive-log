# Ruby Controller for User Model
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    assign_profile_picture
  end

  private

  def assign_profile_picture
    if @user.profile_photo.model.profile_photo_url.nil?
      @profile_photo =
        'https://www.idyllwildarts.org/wp-content/uploads/2016/09/blank-profile-picture.jpg'
    else
      @profile_photo = @user.profile_photo
    end
  end

end

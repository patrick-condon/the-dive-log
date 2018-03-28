# controller to add path to devise route
class RegistrationsController < Devise::RegistrationsController

  protected

  def after_sign_in_path_for(resource)
    user_path(@user) # Or :prefix_to_your_route
  end
end

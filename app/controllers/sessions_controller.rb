# controller to add path to devise route
class SessionsController < Devise::SessionsController
  protected

  def after_sign_in_path_for(resource)
    root_path # Or :prefix_to_your_route
  end
end

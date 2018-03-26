# Ruby Controller for User Model
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
end

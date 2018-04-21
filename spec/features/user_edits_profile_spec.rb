require 'rails_helper'

feature 'user can update account' do
  scenario 'user adds profile photo' do
    user = FactoryBot.create(:user)

    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')

    click_on 'Edit'
    attach_file :user_profile_photo, File.join(Rails.root, '/spec/support/images/exit.png')
    fill_in 'Current password', with: user.password
    click_on 'Update'

    expect(page).to have_content('Your account has been updated successfully')
  end
end

require 'rails_helper'

RSpec.describe Api::V1::PhotosController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:site) do
    Divesite.create(name: 'Cathedral', lat: 18.4434, lng: -64.7818)
  end
  let!(:first_entry) do
    LogEntry.create!(
      divesite_id: site.id, user_id: user.id,
      date: Date.parse('Jul 4 2015'), comments: 'This was a fun dive'
    )
  end
  describe 'POST#create' do
    it 'creates a photo' do
      sign_in user
      post_json = { log_entry_id: first_entry,
                    dive_photo: Rack::Test::UploadedFile.new(Rails.root.join('spec/support/images/exit.png')) }
      prev_count = Photo.count
      post(:create, params: post_json)
      expect(Photo.count).to eq(prev_count + 1)
    end
    it 'returns the log entry' do
      sign_in user
      post_json = { log_entry_id: first_entry,
                    dive_photo: Rack::Test::UploadedFile.new(Rails.root.join('spec/support/images/exit.png')) }
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['log_entry']['comments']).to eq('This was a fun dive')
    end
  end
end

require 'rails_helper'

RSpec.describe Api::V1::DivesitesController, type: :controller do
  let!(:site) do
    Divesite.create(name: 'Cathedral', lat: 18.4434, lng: -64.7818)
  end
  describe 'GET#index' do
    it 'should return a list of divesites' do
      sign_in
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['sites'].length).to eq 1
      expect(returned_json['sites'][0]['name']).to eq('Cathedral')
    end
  end
end

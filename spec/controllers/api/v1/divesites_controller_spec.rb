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
  describe 'GET#show' do
    it 'should return specific information about the divesite' do
      sign_in
      get :show, params: { id: site.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['divesite']['name']).to eq('Cathedral')
      expect(returned_json['divesite']['lat']).to eq(18.4434)
      expect(returned_json['divesite']['lng']).to eq(-64.7818)
    end
  end
  describe 'POST#create' do
    it 'creates a new divesite' do
      sign_in
      post_json = { divesite: { name: 'Blue Heron Bridge', lat: 26.7826,
                                lng: -80.04369 } }
      prev_count = Divesite.count
      post(:create, params: post_json)
      expect(Divesite.count).to eq(prev_count + 1)
    end
    it 'returns the new divesite' do
      sign_in
      post_json = { divesite: { name: 'Blue Heron Bridge', lat: 26.7826,
                                lng: -80.04369 } }
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['divesite']['name']).to eq('Blue Heron Bridge')
      expect(returned_json['divesite']['lat']).to eq(26.7826)
      expect(returned_json['divesite']['lng']).to eq(-80.04369)
    end
  end
end

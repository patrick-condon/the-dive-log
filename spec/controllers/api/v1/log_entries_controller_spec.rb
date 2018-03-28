require 'rails_helper'

RSpec.describe Api::V1::LogEntriesController, type: :controller do
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
  let!(:second_entry) do
    LogEntry.create!(
      divesite_id: site.id, user_id: user.id,
      date: Date.parse('Jun 14 2014'), comments: 'This was fun too'
    )
  end
  describe 'GET#index' do
    it 'should return a list of log entries' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['log_entries'].length).to eq 2
      expect(returned_json['log_entries'][1]['comments']).to eq 'This was a fun dive'
      expect(returned_json['log_entries'][0]['comments']).to eq 'This was fun too'
      expect(returned_json['sites'][0]['name']).to eq 'Cathedral'
    end
  end
  describe 'GET#show' do
    it 'should return the log entry information' do
      sign_in
      get :show, params: { id: first_entry.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['log_entry']['comments']).to eq('This was a fun dive')
      expect(returned_json['author']['first_name']).to eq('Jim')
      expect(returned_json['site']['name']).to eq('Cathedral')
    end
  end
  describe 'POST#create' do
    it 'creates a new LogEntry' do
      sign_in
      post_json = { log_entry: { divesite_id: site.id, user_id: user.id,
                     max_depth: 30, date: Date.parse('Jul 5 2016'),
                     comments: 'I liked this dive'} }
      prev_count = LogEntry.count
      post(:create, params: post_json)
      expect(LogEntry.count).to eq(prev_count + 1)
    end
    it 'returns a json with new LogEntry info' do
      sign_in
      post_json = { log_entry: { divesite_id: site.id, user_id: user.id,
                     max_depth: 30, date: Date.parse('Jul 5 2016'),
                     comments: 'I liked this dive'} }
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json['log_entry']['comments']).to eq('I liked this dive')
      expect(returned_json['log_entry']['date']).to eq('2016-07-05')
    end
  end
end

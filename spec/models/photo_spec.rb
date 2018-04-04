require 'rails_helper'

RSpec.describe Photo, type: :model do
  it { should have_valid(:divesite_id).when(1) }
  it { should_not have_valid(:divesite_id).when(nil, '') }

  it { should have_valid(:user_id).when(1) }
  it { should_not have_valid(:user_id).when(nil, '') }

  it { should have_valid(:log_entry_id).when(1) }
  it { should_not have_valid(:log_entry_id).when(nil, '') }
end

require 'rails_helper'

RSpec.describe Dive, type: :model do
  it { should have_valid(:divesite_id).when(1) }
  it { should_not have_valid(:divesite_id).when(nil, '') }

  it { should have_valid(:user_id).when(1) }
  it { should_not have_valid(:user_id).when(nil, '') }

  it { should have_valid(:date).when('01/01/2001') }
  it { should_not have_valid(:date).when(nil, '') }

  it { should have_valid(:comments).when('This was a dive') }
  it { should_not have_valid(:comments).when(nil, '') }
end

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:username).when('username') }
  it { should_not have_valid(:username).when(nil, '') }

  it { should have_valid(:email).when('email@email.net') }
  it { should_not have_valid(:email).when(nil, '') }

  it { should have_valid(:first_name).when('John') }
  it { should_not have_valid(:first_name).when(nil, '') }

  it { should have_valid(:last_name).when('Smith') }
  it { should_not have_valid(:last_name).when(nil, '') }
end

require 'rails_helper'

RSpec.describe Divesite, type: :model do
  it { should have_valid(:lat).when(1.0) }
  it { should_not have_valid(:lat).when(nil, '') }

  it { should have_valid(:lng).when(1.0) }
  it { should_not have_valid(:lng).when(nil, '') }

  it { should have_valid(:name).when('Cathedral') }
  it { should_not have_valid(:name).when(nil, '') }
end

# README

[ ![Codeship Status for patrick-condon/the-dive-log](https://app.codeship.com/projects/71ef07d0-134b-0136-c028-1e87cb2ec923/status?branch=master)](https://app.codeship.com/projects/283166)
[![Maintainability](https://api.codeclimate.com/v1/badges/a93b0e9064607f1a51e3/maintainability)](https://codeclimate.com/github/patrick-condon/the-dive-log/maintainability)

# the-dive-log

  This is a site for scuba divers to get together and share the details of their dives just like they would in a regular dive log, only with the ability to share the story with the internet, along with pictures from the dive and an accurate map of the location.

* Deployed Site:
  https://the-dive-log.herokuapp.com/

* System dependencies
  Requires Ruby 2.3.3, Bundler, Node >= 6.0.0, Yarn >= 0.25.2

* Configuration
  Clone/download repository. Run `bundle install` and `npm install`.
  Then run `rake db:create` and `rake db:migrate`

* Database initialization
  Since this is still a work in progress and linked to a currently deployed site, some parts of the seed file have been commented out. In order to get the full list of divesites, go to /db/seeds.rb and uncomment out the each loops that create the divesites, save the changes, then run `rake db:seed`.

* How to run the test suite
  Go into the folder in which the app resides in your console and run `rspec spec` and `npm test`

import React, { Component } from 'react';
import LogEntryTile from '../components/LogEntryTile';
import { Link } from 'react-router';

class LogEntriesIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allLogEntries: [],
      diveSites: [],
      headerPhotos: [],
      title: 'Recent Dive Log Entries'
    }
  }
  componentDidMount() {
    fetch('/api/v1/log_entries')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ allLogEntries: body.log_entries,
                      diveSites: body.sites,
                      headerPhotos: body.header_photos});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let sites = this.state.diveSites
    let logEntries = this.state.allLogEntries.map((entry, index) => {
      let diveSite
      sites.forEach(site => {
        if (site.id == entry.divesite_id) {
          diveSite = site
        }
      })
      return(
        <LogEntryTile
          key={entry.id}
          id={entry.id}
          siteName={diveSite.name}
          date={entry.date}
          photo={this.state.headerPhotos[index]}
        />
      )
    })

    return (
      <div className="container wrapper">
        <div className="col text-center">
          <h2>{this.state.title}</h2>
          <div className="row justify-content-center">
            <Link to={'/log_entries/new'} className="btn btn-primary">
              Add New Log Entry
            </Link>
            <Link to={'/divesites/new'} className="btn btn-primary">
              Add New DiveSite
            </Link>
          </div>
        </div>
        <div className="entry-index">
          {logEntries}
        </div>
      </div>
    )
  }
}

export default LogEntriesIndexContainer;

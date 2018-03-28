import React, { Component } from 'react';
import LogEntryTile from '../components/LogEntryTile';
import { Link } from 'react-router';

class LogEntriesIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allLogEntries: [],
      diveSites: [],
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
                      diveSites: body.sites });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let sites = this.state.diveSites
    let logEntries = this.state.allLogEntries.map(entry => {
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
        />
      )
    })

    return (
      <div className="container">
        <h2>{this.state.title}</h2>
        {logEntries}
        <Link to={'/log_entries/new'}>
          Add New Log Entry
        </Link>
      </div>
    )
  }
}

export default LogEntriesIndexContainer;

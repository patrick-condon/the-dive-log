import React, { Component } from 'react';
import LogEntryShow from '../components/LogEntryShow';

class LogEntryShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logEntry: {},
      currentUser: {},
      logEntryAuthor: {},
      diveSite: {}
    }
  }

  componentDidMount() {
  let id = this.props.params.id
  fetch(`/api/v1/log_entries/${id}`,{
    credentials: 'same-origin'
  })
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
      this.setState({ logEntry: body.log_entry, currentUser: body.user,
                    logEntryAuthor: body.author, diveSite: body.site});
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let logEntry = this.state.logEntry
    return (
      <div>
        <LogEntryShow
          logEntry={logEntry}
          author={this.state.logEntryAuthor}
          diveSite={this.state.diveSite}
        />
      </div>
    )
  }
}

export default LogEntryShowContainer;

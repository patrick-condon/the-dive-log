import React, { Component } from 'react';
import LogEntryTile from '../components/LogEntryTile';
import { Link } from 'react-router';
// import pic1 from "../../../app/assets/images/cave.jpg"
// import pic2 from "../../../app/assets/images/octopus.jpg"
// import pic3 from "../../../app/assets/images/turtle.jpg"

class LogEntriesIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allLogEntries: [],
      diveSites: [],
      headerPhotos: [],
      currentPage: 1,
      title: 'Recent Dive Log Entries'
    }
    this.handleClick = this.handleClick.bind(this)
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
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    let sites = this.state.diveSites
    let entriesPerPage = 6
    let pageEntries, lastIndex, firstIndex
    let allEntries = this.state.allLogEntries
    if (allEntries.length > entriesPerPage) {
      lastIndex = this.state.currentPage * entriesPerPage
      firstIndex = lastIndex - entriesPerPage
      pageEntries = allEntries.slice(firstIndex, lastIndex)
    } else {
      pageEntries = allEntries
    }
    let logEntries = pageEntries.map((entry) => {
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
          photo={this.state.headerPhotos[allEntries.indexOf(entry)]}
        />
      )
    })
    let pageNumbers = []
    for (let i = 1; i <= Math.ceil(allEntries.length / entriesPerPage); i++) {
          pageNumbers.push(i);
        }
    let pages = pageNumbers.map(number => {
      let className = "page-item"
      let link =
        <a
          id={number}
          href="#"
          className="page-link"
          onClick={this.handleClick}
        >
        {number}
        </a>
      if (number == this.state.currentPage) {
        className = "page-item active"
        link =
        <span className="page-link">
          {number}
        </span>
      }
      return (
        <li className={className} key={number}>
          {link}
        </li>
      );
    })
    return (
      <div className="container wrapper">
        <div className="col text-center">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" data-interval="10000" >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="https://s3.amazonaws.com/the-dive-log/uploads/carousel/cave.jpg" alt="First slide"/>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="https://s3.amazonaws.com/the-dive-log/uploads/carousel/octopus.jpg" alt="Second slide"/>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="https://s3.amazonaws.com/the-dive-log/uploads/carousel/turtle.jpg" alt="Third slide"/>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
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
          <ul className="pagination justify-content-center">
            {pages}
          </ul>
        </div>

      </div>
    )
  }
}

export default LogEntriesIndexContainer;

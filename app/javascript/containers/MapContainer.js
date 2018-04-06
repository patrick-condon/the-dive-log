import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoicGF0cmljay1jb25kb24iLCJhIjoiY2pmZDIxbnVzMXV0YTJxb2Y5eGtvZjZnOCJ9.Die7jcYfM9IEvhVgNwQzcw"
});

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieceOfState: null,
      anotherPiece: []
    }
    this._getLatLong = this._getLatLong.bind(this)
  }
  _getLatLong(map, event) {
    console.log(event.lngLat.lng.toFixed(6), event.lngLat.lat.toFixed(6))
    // console.log(event.lngLat.lat.toFixed(6))
    if (this.props.setCoordinates){
      this.props.setCoordinates(event.lngLat)
    }
  }

  render() {
    return(
      <div className={this.props.size}>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: this.props.height,
            width: this.props.width
          }}
          center={[this.props.lng, this.props.lat]}
          onClick={this._getLatLong}
          >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-11"}}
            >
            <Feature coordinates={[this.props.lng, this.props.lat]}/>
          </Layer>
        </Map>
      </div>
    )
  }
}
export default MapContainer;

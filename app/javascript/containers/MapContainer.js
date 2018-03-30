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
  }

  render() {
    return(
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "30vh",
            width: "30vw"
          }}
          center={[this.props.lng, this.props.lat]}
          >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15"}}>
            <Feature coordinates={[this.props.lng, this.props.lat]}/>
          </Layer>
        </Map>
      </div>
    )
  }
}
export default MapContainer;

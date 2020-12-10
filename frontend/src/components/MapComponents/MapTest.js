import React, { Component } from "react";
import {MapContainer, TileLayer, Popup, Marker, withLeaflet} from "react-leaflet";
import osm from "./osm-providers"


const MyMarker = props => {

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }

  return <Marker ref={initMarker} {...props}/>
}

class MapTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.setState({ currentPos: e.latlng });
  }

  render() {
    return (
      <div>
        <MapContainer zoom={8} center={{ lat: 51.5287718, lng: -0.2416804 }} onClick={this.handleClick}>
          <TileLayer
              url={osm.maptiler.url} attribution={osm.maptiler.attribution}
          />
          { this.state.currentPos && <MyMarker position={this.state.currentPos}>
            <Popup position={this.state.currentPos}>
              Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
            </Popup>
          </MyMarker>}
        </MapContainer>
      </div>
    )
  }
}

export default MapTest;

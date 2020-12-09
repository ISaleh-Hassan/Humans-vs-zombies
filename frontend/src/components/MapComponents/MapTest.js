import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicGVyY2hyaXN0ZXI3IiwiYSI6ImNraWhqYTJqejF2engyc3BvbTdrcHhsNzIifQ.SE5ympIl6CiI_0GCnrRNnA';

class MapTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 18.0622,
      lat: 59.3319,
      zoom: 10
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    return (
      <section className="home">
        <div className="container">
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
          <div ref={el => this.mapContainer = el} className='leaflet-container' />
        </div>
      </section>
    )
  }
}

export default MapTest
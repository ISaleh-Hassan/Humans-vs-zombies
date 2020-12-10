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
    let coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    let marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(map);

    function onDragEnd() {
      let lngLat = marker.getLngLat();
      coordinates.style.display = 'block';
      coordinates.innerHTML =
        'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }

    marker.on('dragend', onDragEnd);
  }

  render() {
    return (
      <section className="home">
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css" rel="stylesheet" />
        <div className="container">
          <div ref={el => this.mapContainer = el} className='leaflet-container'></div>
          <p id="coordinates" class="coordinates"></p>
        </div>
      </section>
    )
  }
}

export default MapTest
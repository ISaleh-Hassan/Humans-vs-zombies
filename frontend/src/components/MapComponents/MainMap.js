import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicGVyY2hyaXN0ZXI3IiwiYSI6ImNraWhqYTJqejF2engyc3BvbTdrcHhsNzIifQ.SE5ympIl6CiI_0GCnrRNnA';

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 18.0622,
      lat: 59.3319,
      zoom: 5
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
    });

    let mission = document.createElement('div');
    mission.className = 'mission';
    let missionMarker = new mapboxgl.Marker(mission);
    missionMarker.setLngLat([this.state.lng, this.state.lat]).addTo(map);

    let gravestone = document.createElement('div');
    gravestone.className = 'gravestone';
    let graveStoneMarker = new mapboxgl.Marker(gravestone);
    graveStoneMarker.setLngLat([14.1618, 57.7826]).addTo(map);

    function onDragEnd() {
      let lngLat = marker.getLngLat();
      coordinates.innerHTML =
        'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
        localStorage.setItem('Marker Lng: ', lngLat.lng);
        localStorage.setItem('Marker Lat: ', lngLat.lat);
    }

    marker.on('dragend', onDragEnd);

    function showPosition(position) {
      let currentPosition = document.getElementById("current-position");
      // currentPosition.innerHTML = "Longitude: " + position.coords.longitude +
      //   "<br>Latitude: " + position.coords.latitude;
      marker.setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map)
      localStorage.setItem('Current Position Lng: ', position.coords.longitude)
      localStorage.setItem('Current Position Lat: ', position.coords.latitude)
    }

    if (navigator.geolocation) {
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true
        }),
        navigator.geolocation.getCurrentPosition(showPosition)
      );
    }
  }

  render() {
    return (
      <>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css" rel="stylesheet" />
        <script src='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.js'></script>
        <div ref={el => this.mapContainer = el} className='leaflet-container'></div>
        <label>Marker Location: </label>
        <p id="coordinates"></p>
        {/* <label>Current Location: </label> */}
        <p id="current-position"></p>
      </>
    )
  }
}

export default MainMap
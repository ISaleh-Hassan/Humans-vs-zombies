import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { FetchAllMissions } from '../../utils/missionStorage';
import { FetchAllSquadCheckin } from '../../utils/squadCheckinStorage';
import { FetchAllKills } from '../../utils/KillStorage';
import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = 'pk.eyJ1IjoicGVyY2hyaXN0ZXI3IiwiYSI6ImNramlpcXF6aTB5dHMydHFveHE0cDdleXMifQ.cOdCvVE4RuyE_0SRtC-1ww'
// mapboxgl.accessToken = 'pk.eyJ1IjoicGVyY2hyaXN0ZXI3IiwiYSI6ImNramszdGZiaDJ5NGQzMnNjZnZscjV1YTIifQ.U_P4O-0Z-ao0svLTf0W4kQ'

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
    mapboxgl.accessToken = 'pk.eyJ1IjoicGVyY2hyaXN0ZXI3IiwiYSI6ImNraWhqYTJqejF2engyc3BvbTdrcHhsNzIifQ.SE5ympIl6CiI_0GCnrRNnA';
    let coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    let marker = new mapboxgl.Marker({
      draggable: true
    });

    let faction = localStorage.getItem("Faction")
    let user = localStorage.getItem("Username")
    let userType = localStorage.getItem("Usertype")

    async function fetchMissions() {
      let missions = await FetchAllMissions();
      if (missions != null && userType != null) {
        missions.map((m) => {

          let mission = document.createElement('div');
          mission.className = 'mission';
          let missionMarker = new mapboxgl.Marker(mission);

          let popup = new mapboxgl.Popup({ offset: 25 })
            .setText('Mission: ' + m.name);

          if (m.missionPoint !== null && m.factionVisibility === faction) {
            missionMarker
              .setLngLat([m.missionPoint.x, m.missionPoint.y]).setPopup(popup).addTo(map)
          }
          if (m.missionPoint !== null && userType === 'ADMINISTRATOR') {
            missionMarker
              .setLngLat([m.missionPoint.x, m.missionPoint.y]).setPopup(popup).addTo(map)
          }
        }
        )
      } else {
        console.log("Error!")
      }
    }

    async function fetchSquadCheckins() {
      let squadCheckins = await FetchAllSquadCheckin();
      if (squadCheckins != null && userType != null) {
        squadCheckins
          .map((sq) => {

            let squadCheckin = document.createElement('div');
            squadCheckin.className = 'squad';
            let squadCheckinMarker = new mapboxgl.Marker(squadCheckin);

            let popup = new mapboxgl.Popup({ offset: 25 })
              .setText("Squad Member ID: " + sq.squadMemberId + ' checked in: ' + sq.position.x + " " +  sq.position.y);

            if (sq.position !== null && sq.squadId !== null || sq.squadId !== undefined) {
              squadCheckinMarker
                .setLngLat([sq.position.x, sq.position.y]).setPopup(popup).addTo(map)
            }
            if (userType === 'ADMINISTRATOR' && sq.position !== null && sq.squadId !== null || sq.squadId !== undefined) {
              squadCheckinMarker
                .setLngLat([sq.position.x, sq.position.y]).setPopup(popup).addTo(map)
            }
          }
          )
      } else {
        console.log("Error!")
      }
    }

    async function fetchKills() {
      let kills = await FetchAllKills();
      if (kills != null && userType != null) {
        kills
          .map((k) => {

            let kill = document.createElement('div');
            kill.className = 'gravestone';
            let killMarker = new mapboxgl.Marker(kill);

            let popup = new mapboxgl.Popup({ offset: 25 })
              .setText('Description: ' + k.description + '\nTime of Death: ' + k.timeOfDeath.replace('T', ' ').substring(0, k.timeOfDeath.lastIndexOf('.')));

            killMarker
              .setLngLat([k.position.x, k.position.y]).setPopup(popup).addTo(map)
          }
          )
      } else {
        console.log("Error!")
      }
    }

    fetchMissions();
    fetchSquadCheckins();
    fetchKills();

    function onDragEnd() {
      let lngLat = marker.getLngLat();
      let lngValue = lngLat.lng.toFixed(4);
      let latValue = lngLat.lat.toFixed(4);
      coordinates.innerHTML =
        'Longitude: ' + lngValue + '<br />Latitude: ' + latValue;
      localStorage.setItem("Lng: ", lngValue);
      localStorage.setItem("Lat: ", latValue);
    }

    marker.on('dragend', onDragEnd);

    function showPosition(position) {
      let currentPosition = document.getElementById("current-position");
      // currentPosition.innerHTML = "Longitude: " + position.coords.longitude +
      //   "<br>Latitude: " + position.coords.latitude;
      marker.setLngLat([position.coords.longitude.toFixed(4), position.coords.latitude.toFixed(4)]).addTo(map)
      localStorage.setItem('Current Position Lng: ', position.coords.longitude.toFixed(4))
      localStorage.setItem('Current Position Lat: ', position.coords.latitude.toFixed(4))
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

        <script src='https://api.mapbox.com/mapbox-gl-js/v1.13.0/mapbox-gl.js'></script>
        <link href='https://api.mapbox.com/mapbox-gl-js/v1.13.0/mapbox-gl.css' rel='stylesheet' />

        <div ref={el => this.mapContainer = el} className='mapbox-gl'></div>
        <label>Marker Location: </label>
        <p id="coordinates"></p>
        <p id="current-position"></p>
      </>
    )
  }
}

export default MainMap
import React, { useRef, useState } from "react";
import '../Stylings/Components.css';
import Header from '../Stylings/Header';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from "./osm-providers"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const markerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 40],
    iconAnchor: [17, 45],
    popupAnchor: [0, 46],
    shadowUrl: iconShadow
})

const Maps = () => {

    const ZOOM_LEVEL = 100;
    const mapRef = useRef();
    const markerRef = useRef();
    const [center, setCenter] = useState({ lat: 59.331930951472984, lng: 18.062299042156532 });

    return (
        <>
            <Header />
            <section className="home">
                <div className="container">
                    <div className="leaflet-container">
                        <MapContainer
                            center={center}
                            zoom={ZOOM_LEVEL}
                            ref={mapRef}
                        >
                            <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                            <Marker
                                position={[center.lat, center.lng]}
                                icon={markerIcon}
                                draggable={true}
                            >
                                <Popup>
                                    <b>Lat: {center.lat}</b>
                                    <br></br>
                                    <b>Lng: {center.lng}</b>
                                </Popup>

                            </Marker>

                            <div id="map"></div>
                        </MapContainer>
                    </div>
                    <div>
                        <form>
                            <label for="latitude">Latitude:</label>
                            <input id="latitude" type="text" />
                            <br></br>
                            <label for="longitude">Longitude:</label>
                            <input id="longitude" type="text" />
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Maps;
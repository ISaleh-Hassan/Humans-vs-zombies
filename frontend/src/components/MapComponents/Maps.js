import React, { useRef, useState } from "react";
import '../Stylings/Components.css';
import Header from '../Stylings/Header';
import { MapContainer, TileLayer } from "react-leaflet";
import osm from "./osm-providers"
import "leaflet/dist/leaflet.css"


const Maps = () => { 

    const [center, setCenter] = useState({ lat: 59.331930951472984, lng: 18.062299042156532 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    return (
        <>
            <Header />
            <section className="home">
                <div className="leaflet-container">
                    <MapContainer
                        center={center}
                        zoom={ZOOM_LEVEL}
                        ref={mapRef}
                    >
                        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                    </MapContainer>

                </div>
            </section>
        </>
    );
};

export default Maps;
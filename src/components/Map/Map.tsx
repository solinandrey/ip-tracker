import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

import styles from "./Map.module.scss";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

interface IProp {
  position: {
    lat: number;
    lng: number;
  }
}

export const Map = ({position}: IProp) => {

  return (
    <div className={styles.map}>
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        scrollWheelZoom
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

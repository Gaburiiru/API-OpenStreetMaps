import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import assets from "../assets/assets";

const icon = L.icon({
  iconUrl: assets.ubicacion,
  iconSize: [38, 38],
});

const position = [-34.61315,-58.37723];

function ResetCenterView(props) {
  const { posicion } = props;
  const map = useMap();

  useEffect(() => {
    if (posicion) {
      map.setView(
        L.latLng(posicion?.lat, posicion?.lon),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  }, [posicion]);

  return null;
}

function Maps(props) {
  const { posicion } = props;
  const locationSelection = [posicion?.lat, posicion?.lon];

  return (
    <>
      <MapContainer
        center={position}
        zoom={8}
        style={{ width: "100%", height: "100%", borderRadius:'15px'}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=EH4f7fz9tpHuP1Ic7wqb"
        />
        {posicion && (
          <Marker position={locationSelection} icon={icon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
        <ResetCenterView posicion={posicion} />
      </MapContainer>
    </>
  );
}

export default Maps;

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polygon } from 'react-leaflet'
import * as L from "leaflet";

const AddMarkerToClick = ({ updatePosition }) => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const map = useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setPosition({
        latitude: lat,
        longitude: lng,
      });
      updatePosition(lat, lng)
    },
  });

  return (
    position.latitude !== 0 && position.longitude !== 0 ? (
      <Marker
        position={[position.latitude, position.longitude]}
        interactive={false}
      />
    ) : null
  );
}

const MissionAdminMap = ({ gameMap, getNewMissionCoordinates }) => {


  const latlngs = gameMap.map((coordinate) => [coordinate.latitude, coordinate.longitude])

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [marker, setMarker] = useState(null)

  const handleMapClick = (e) => {

    console.log(e.latLng)
  }

  const updatePosition = (lat, lng) => {
    setPosition({
      latitude: lat,
      longitude: lng,
    });
    getNewMissionCoordinates({ longitude: lng, latitude: lat })
  }

  return (
    <MapContainer center={L.latLngBounds(latlngs).getCenter()} zoom={15} scrollWheelZoom={false} onClick={() => handleMapClick()}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddMarkerToClick updatePosition={updatePosition}></AddMarkerToClick>
      <Polygon positions={latlngs}></Polygon>
    </MapContainer>
  )
}

export default MissionAdminMap
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

const AddMarkerToClick = ({updatePosition}) => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  
  const map = useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setPosition({
        latitude: lat,
        longitude: lng,
      });
      updatePosition(lat,lng)
    },
  });
  
  return (
    position.latitude !== 0 && position.longitude !== 0 ? (
      <Marker
        position={[position.latitude, position.longitude]}
        interactive={false}
      />
    ) : null
  ); }

const MissionAdminMap = () => {

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    const handleMapClick = (e) => {
      console.log(e.latlng)
    }

    const updatePosition = (lat,lng) => {
      setPosition({
        latitude: lat,
        longitude: lng,
      });
    }

    console.log(position)
  return (
    <MapContainer center={[60.1702506, 24.9505305]} zoom={15} scrollWheelZoom={false} onClick={() => handleMapClick()}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddMarkerToClick updatePosition={updatePosition}></AddMarkerToClick>
    </MapContainer>
  )
}

export default MissionAdminMap

//   const coordinates = [{ long: "24.9386644", lat: "60.169909" },
//   { long: "24.9423552", lat: "60.1675821" },
//   { long: "24.9568391", lat: "60.1679236" },
//   { long: "24.9563241", lat: "60.1740395" },
//   { long: "24.9504018", lat: "60.1740181" },
//   { long: "24.9446726", lat: "60.1703573" },
//   { long: "24.9497366", lat: "60.1706882" }
//   ]

//   const latlngs = [
//     [
//       60.169909,
//       24.9386644
//     ],
//     [
//       60.1675821,
//       24.9423552
//     ],
//     [
//       60.1679236,
//       24.9568391
//     ],
//     [
//       60.1740395,
//       24.9563241
//     ],
//     [
//       60.1740181,
//       24.9504018
//     ],
//     [
//       60.1703573,
//       24.9446726
//     ],
//     [
//       60.1699303,
//       24.9386859
//     ]
//   ];
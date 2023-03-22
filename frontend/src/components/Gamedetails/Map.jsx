import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'

const Map = ({coordinates}) => {



  // const coordinates =
  console.log(coordinates)

  // const coordinates = [{ long: "24.9386644", lat: "60.169909" },
  // { long: "24.9423552", lat: "60.1675821" },
  // { long: "24.9568391", lat: "60.1679236" },
  // { long: "24.9563241", lat: "60.1740395" },
  // { long: "24.9504018", lat: "60.1740181" },
  // { long: "24.9446726", lat: "60.1703573" },
  // { long: "24.9497366", lat: "60.1706882" }
  // ]

  const latlngs = coordinates.map((coordinate) => [coordinate.longitude, coordinate.latitude])
  // const latlngs = [
  //   [
  //     60.169909,
  //     24.9386644
  //   ],
  //   [
  //     60.1675821,
  //     24.9423552
  //   ],
  //   [
  //     60.1679236,
  //     24.9568391
  //   ],
  //   [
  //     60.1740395,
  //     24.9563241
  //   ],
  //   [
  //     60.1740181,
  //     24.9504018
  //   ],
  //   [
  //     60.1703573,
  //     24.9446726
  //   ],
  //   [
  //     60.1699303,
  //     24.9386859
  //   ]
  // ];

  return (
    <MapContainer center={L.latLngBounds(latlngs).getCenter()} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {coordinates.map((e, i) => <Marker key={i} position={[e.latitude, e.longitude]}>
        <Popup>
          Marker
        </Popup>
      </Marker>)} */}
      <Polygon positions={latlngs}></Polygon>

    </MapContainer>
  )
}

export default Map

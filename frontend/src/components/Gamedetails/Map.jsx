import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'

const Map = ({ coordinates }) => {

  //transform coordinates to a list form
  const latlngs = coordinates.map((coordinate) => [coordinate.longitude, coordinate.latitude])

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

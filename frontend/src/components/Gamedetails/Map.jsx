import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'

const Map = ({coordinates, bites}) => {
  const L = window.L
  const latlngs = coordinates.map((coordinate) => [coordinate.longitude, coordinate.latitude])

  return (
    <MapContainer center={L.latLngBounds(latlngs).getCenter()} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bites && bites.map((e, i) =>
      {
        return( <Marker key={i} position={[e.longitude, e.latitude]}>
        <Popup>
          <h6>description: {e.story}</h6>
          <p>Victim id: {e.victimId}</p>
          <p>Killed id: {e.biterId}</p>
        </Popup>
      </Marker>)})}
      <Polygon positions={latlngs}></Polygon>

    </MapContainer>
  )
}

export default Map

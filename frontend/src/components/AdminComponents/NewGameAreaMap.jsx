import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polygon } from 'react-leaflet'
import { Button } from '@mui/material';


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
    null
  );
}

const NewGameAreaMap = ({ getCoordinates }) => {

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [markerList, setMarkerList] = useState([])
  const [areaPreview, setAreaPreview] = useState(false)
  const [areaPolygon, setAreaPolygon] = useState([])
  const [update, setUpdate] = useState(false)



  const updatePosition = (lat, lng) => {
    setPosition({
      latitude: lat,
      longitude: lng,
    });
    markerList.push({ latitude: lat, longitude: lng })
    getCoordinates(markerList)
  }

  const handleRemoveLastClick = () => {
    setUpdate(!update)
    markerList.splice(markerList.length - 1, 1)
    setMarkerList(markerList)
  }

  const handlePreviewClick = () => {
    setAreaPreview(true)
    markerList.forEach((e) => areaPolygon.push([e.latitude, e.longitude]))

    areaPolygon.push([markerList[0].latitude, markerList[0].longitude])
    setAreaPolygon(areaPolygon)
  }
  const handleStopPreviewClick = () => {
    setAreaPreview(false)
    setAreaPolygon([])
  }

  //console.log(position)
  return (<div>
    <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddMarkerToClick updatePosition={updatePosition}></AddMarkerToClick>
      {markerList.length !== 0 && update && markerList.map((e, index) => <Marker key={index}
        position={[e.latitude, e.longitude]}
        interactive={false}
      />)}
      {markerList.length !== 0 && !update && markerList.map((e, index) => <Marker key={index}
        position={[e.latitude, e.longitude]}
        interactive={false}
      />)}
      {areaPreview && areaPolygon.length !== 0 && <Polygon positions={areaPolygon}></Polygon>}
    </MapContainer>
    {areaPreview ? <><Button onClick={handleStopPreviewClick}>Stop</Button></> : <><Button onClick={handlePreviewClick}>Preview</Button></>}
    {markerList.length !== 0 && !areaPreview && <Button onClick={handleRemoveLastClick}>Remove Last</Button>}
  </div>
  )
}

export default NewGameAreaMap
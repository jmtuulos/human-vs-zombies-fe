import { useState } from "react"

export const GetCoordinates  = () => {
  const [ latitude, setLatitude ] = useState(0)
  const [ longitude, setLongitude ] = useState(0)

  let checkInPosition = {'latitude': 0, 'longitude': 0}
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
    console.log("here", latitude, longitude)
    return {'latitude': latitude, 'longitude': longitude}

  }
  console.log(checkInPosition)
  return checkInPosition
}

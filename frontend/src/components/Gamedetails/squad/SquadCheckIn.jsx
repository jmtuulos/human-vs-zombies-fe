import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { postSquadCheckIn } from "../../../api/squad"
import { useUser } from "../../../context/UserContext"
import { GetCoordinates } from "../../GetCoordinates"

export const SquadCheckIn = ({squadId, gameId}) =>
{
  const { user } = useUser()
  const [ latitude, setLatitude ] = useState(0)
  const [ longitude, setLongitude ] = useState(0)
  console.log(user.squadId)

  const mutation = useMutation(
    { mutationFn: (position) => postSquadCheckIn(gameId, squadId, position),
    onSuccess: () => {
      window.alert("checked in")
    },
    onError: () => {
      window.alert("Check in failed")
    }
  })

  const handleCheckIn = () => {
    const defaultPosition = {
      "latitude": 0,
      "longitude": 0
    }
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        console.log(position)
      })
      mutation.mutate({'latitude': latitude, 'longitude': longitude})
    }
  }
  return (
    <Button variant="contained" color="success" onClick={handleCheckIn}>Check in</Button>
  )
}

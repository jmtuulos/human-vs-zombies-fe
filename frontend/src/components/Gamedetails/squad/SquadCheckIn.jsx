import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { postSquadCheckIn } from "../../../api/squad"
import { useUser } from "../../../context/UserContext"

export const SquadCheckIn = ({gameId}) =>
{
  const { user } = useUser()
  const [ latitude, setLatitude ] = useState(0)
  const [ longitude, setLongitude ] = useState(0)

  const mutation = useMutation(
    { mutationFn: (position) => postSquadCheckIn(gameId, user.squadId, position),
    onSuccess: () => {
      window.alert("checked in")
    },
    onError: () => {
      window.alert("Check in failed, unable to get your coordinates")
    }
  })

  const getPosition = () => {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject,{timeout:10000})
    )
  }

  const handleCheckIn = () => {
    getPosition()
    .then((position) => {
      if (position.coords.latitude == 0 && position.coords.longitude == 0)
        window.alert("Check in failed, unable to get your coordinates")
      else {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        mutation.mutate({'latitude': latitude, 'longitude': longitude})
      }
    })
    .catch((err) => {
      console.error(err.message);
    })

  }

  return (
    <Button variant="contained" color="success" onClick={handleCheckIn}>Check in</Button>
  )
}

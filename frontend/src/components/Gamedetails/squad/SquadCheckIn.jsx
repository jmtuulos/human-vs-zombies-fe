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
  console.log(user.squadId)

  const mutation = useMutation(
    { mutationFn: (variables) => postSquadCheckIn(gameId, user.squadId, variables),
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
      console.log("position", position)
      if (position.coords.latitude == 0 && position.coords.longitude == 0)
        window.alert("zero coordinates, unable to check in")
      else {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        mutation.mutate([{'latitude': latitude, 'longitude': longitude}])
      }
    })
    .catch((err) => {
      console.log("failed to get position", err)
    })

  }

  return (
    <Button variant="contained" color="success" onClick={handleCheckIn}>Check in</Button>
  )
}

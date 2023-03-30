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
  const [ checkedIn, setIsCheckedVisible ] = useState(false)

  const mutation = useMutation(
    { mutationFn: (variables) => postSquadCheckIn(gameId, user.squadId, variables[0]),
    onSuccess: () => {
      setIsCheckedVisible(true);
      setTimeout(() => {
      setIsCheckedVisible(false);
      }, 3000);
      console.log("")
    },
    onError: (err) => {
      console.log(err)
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
        window.alert("No coordinates, unable to check in")
      else {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        mutation.mutate([{'latitude': position.coords.latitude, 'longitude': position.coords.longitude}])
      }
    })
    .catch((err) => {
      console.log("failed to get position", err)
    })
  }

  return (
        <Button  color={checkedIn ? "success" : "secondary"} onClick={handleCheckIn}>{checkedIn ? <>Checked in</> : <>Check in</>}</Button>
  )
}

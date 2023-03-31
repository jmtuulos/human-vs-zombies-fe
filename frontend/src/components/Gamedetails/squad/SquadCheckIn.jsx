import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { postSquadCheckIn } from "../../../api/squad"
import { useUser } from "../../../context/UserContext"
import { getPosition } from "../../../position/getPosition"

export const SquadCheckIn = ({gameId}) =>
{
  const { user } = useUser()
  const [ setLatitude ] = useState(0)
  const [ setLongitude ] = useState(0)
  const [ checkedIn, setIsCheckedVisible ] = useState(false)

  const mutation = useMutation(
    { mutationFn: (variables) => postSquadCheckIn(gameId, user.squadId, variables[0]),
    onSuccess: () => {
      setIsCheckedVisible(true);
      setTimeout(() => {
      setIsCheckedVisible(false);
      }, 3000);
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const handleCheckIn = () => {

    getPosition()
    .then((position) => {
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
        <Button
          color={checkedIn ? "success" : "secondary"}
          onClick={handleCheckIn}>{checkedIn ? <>Checked in</> : <>Check in</>}
        </Button>
  )
}

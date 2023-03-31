import { useState } from "react"
import { useForm } from 'react-hook-form'
import { FormControlLabel, styled, Switch, Typography } from "@mui/material"
import { createBite } from "../../api/bite"
import { useMutation } from "@tanstack/react-query"
import { getPosition } from "../../position/getPosition"

const BiteCodeForm = (gameId) => {
  const { register, handleSubmit, control, reset } = useForm()
  const [ submitted, setSubmitted ] = useState(false)
  const [ failed, setFailed ] = useState(false)

  const mutation = useMutation(
    { mutationFn: (variables) => createBite(gameId, variables[0], variables[1], variables[2]),
    onSuccess: () => {
      setSubmitted(true);
      setTimeout(() => {
      setSubmitted(false);
      }, 3000)
    },
    onError: () => {
      setSubmitted(true);
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
        setSubmitted(false);
      }, 3000)
    } },
  )

  const handleRegistration = (data) => {
    let bitePosition = null
    if (data.coordinates){
      getPosition()
      .then((position) => {
        bitePosition = [{'latitude': position.coords.latitude, 'longitude': position.coords.longitude}]
        mutation.mutate(data.bitecode, data.description, bitePosition)
      }
      )
      .catch((err) => {
        console.log("failed to get position", err)
      })
      reset()
    }
    else
      mutation.mutate([data.bitecode, data.description, bitePosition])
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    color: 'red',
    padding: theme.spacing(1),
  }))

  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      <div className="mb-3 mt-3">
        <label className="form-label"></label>
        <input {...register("bitecode")} type="text" placeholder="Enter a bite code" required />
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label" placeholder="Description"></label>
        <input {...register("description")} type="text" placeholder="Description" />
      </div>
      <div><FormControlLabel control={<Switch />} label="Coordinates" {...register("coordinates")} /></div>
      {!submitted ?
        <input
          className="arrow-button1"
          type="image"
          src="/images/arrow.svg" alt="arrow image"
          style={{ width: "40px" }} />
          :
          (!failed ? <Typography color='green' variant="h6">Submitted</Typography> : <Div color="success">Failed to submit (Please check the code is valid)</Div>)
      }
    </form>
  )
}

export default BiteCodeForm;

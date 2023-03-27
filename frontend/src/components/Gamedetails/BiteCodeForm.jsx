import { useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import { FormControlLabel, Switch } from "@mui/material"
import { createBite } from "../../api/bite"
import { useMutation, useQuery } from "@tanstack/react-query"



const BiteCodeForm = (gameId) => {
  const { bitecode, setBiteCode } = useState("")
  const { register, handleSubmit, control, reset } = useForm()

  const mutation = useMutation(
    { mutationFn: (variables) => createBite(gameId, variables[0], variables[1], variables[2]) },
  )

  const handleRegistration = (data) => {
    let bitePosition = null
    if (data.coordinates && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        bitePosition = position
      })
    }
    mutation.mutate([data.bitecode, data.description, bitePosition])
    reset()
  }

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
      <input
        className="arrow-button1"
        type="image"
        src="/images/arrow.svg" alt="arrow image"
        style={{ width: "40px" }} />
    </form>
  )
}

export default BiteCodeForm;

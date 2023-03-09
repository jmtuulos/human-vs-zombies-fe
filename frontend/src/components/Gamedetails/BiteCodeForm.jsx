import { useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import { FormControlLabel, Switch } from "@mui/material"



const BiteCodeForm = () => {
  const { bitecode, setBiteCode } = useState("")
  const { register, handleSubmit, control } = useForm()
  const handleRegistration = (data) => console.log(data);

  return (
      <form onSubmit={ handleSubmit(handleRegistration) }>
        <div className="mb-3 mt-3">
          <label for="number" class="form-label"></label>
          <input {...register("bitecode")} type="text" placeholder="Enter a bite code" required/>
        </div>
        <div className="mb-3 mt-3">
          <label for="text" class="form-label" placeholder="Description"></label>
          <input {...register("description")} type="text" placeholder="Description"/>
        </div>
        <div><FormControlLabel control={<Switch/>} label="Coordinates" /></div>
        <input
          className="arrow-button1"
          type="image"
          src="/images/arrow.svg" alt="arrow image"
          style={{ width: "40px" }}/>
      </form>
  )
}

export default BiteCodeForm;

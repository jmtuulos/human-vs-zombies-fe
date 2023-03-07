import { useState } from "react"
import { useForm } from 'react-hook-form'



const BiteCodeForm = () => {
  const { bitecode, setBiteCode } = useState("")
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={ handleSubmit(handleSubmit) }>
      <label>
        <input {...register("bitecode")}
          type="text"
          placeholder="Enter a bite code"
          required
          />
      </label>
      <input
      className="button"
      type="submit"
      value="enter"/>
    </form>
  )
}

export default BiteCodeForm;

import { useState } from "react"
import { useForm } from 'react-hook-form'



const BiteCodeForm = () => {
  const { bitecode, setBiteCode } = useState("")
  const { register, handleSubmit } = useForm()
  const handleRegistration = (data) => console.log(data);

  return (
    <i class="fal fa-container-storage">
      <form onSubmit={ handleSubmit(handleRegistration) }>
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


    </i>

  )
}

export default BiteCodeForm;

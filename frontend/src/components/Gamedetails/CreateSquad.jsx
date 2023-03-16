import { useState } from "react"
import { useForm } from "react-hook-form"
import { createSquad } from "../../api/squad"

export const CreateSquadForm = () => {

  const { squadname, setSquadName } = useState("")
  const { register, handleSubmit, reset } = useForm()

  const handleSquadCreate = (data) => {
    console.log(data.squadname)
    createSquad(data.squadname)
    reset()
  }
  return (
    <div class="card">
        <div class="card-body">
        <h5 class="card-title">Create a squad</h5>
        <form onSubmit={ handleSubmit(handleSquadCreate) }>
          <input {...register("squadname") } type="text" placeholder="Name your squad"/>
          <div className="mt-2">
              <input
            className="arrow-button1"
            type="image"
            src="/images/arrow.svg" alt="arrow image"
            style={{ width: "40px" }}/>

          </div>
        </form>
        </div>
    </div>
  )
}

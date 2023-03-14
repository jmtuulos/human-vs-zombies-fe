import { useState } from "react"

const AdminTools = () => {

  const [editId, setEditId] = useState(null);
  const [createGame, setCreateGame] = useState(false)
  const [name, setName] = useState({ value: "" });
  const [editTab, setEditTab] = useState("Players")


  const games = [{ id: "1", name: "Zombie Mayhem", active: "Active", players: "20", date: "13.3.2023" },
  { id: "2", name: "Noroff zombie invasion", active: "Active", players: "100", date: "13.3.2023" },
  { id: "3", name: "Running zombies", active: "Active", players: "10", date: "13.3.2023" }
  ]

  const handleNameChange = (event) => {
    setName({ value: event.target.value });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    alert("Game Created!");
  };

  const handleEditClick = (e) => {
    console.log(e)
    setEditId(e.id)
  }

  const handleExitClick = () => {
    setEditId(null)
    setCreateGame(false)
  }

  const handleCreateGameClick = () => {
    setCreateGame(true)
  }

  const radioChangeHandler = (e) => {
    setEditTab(e.target.value);
  };


  return (
    <div>
      <h3 className="text-center">Admin Tools</h3>

      {createGame ? <>
        <button type="button" onClick={() => handleExitClick()} className="btn btn-danger text-right">Close</button>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <fieldset >
              <label>
                Game name:
                <input type="text" value={name.value} onChange={handleNameChange} />
              </label>
              <label>
                Description:
                <input type="text" value={name.value} onChange={handleNameChange} />
              </label>
              <button type="submit">Create</button>
            </fieldset>
          </div>
        </form>


      </> : <>
        {editId !== null ? <div>
          <button type="button" onClick={() => handleExitClick()} className="btn btn-danger text-right">Close</button>
          <div>
            <input type="radio" value="Players" name="tab" onChange={radioChangeHandler} /> Players
            <input type="radio" value="Missions" name="tab" onChange={radioChangeHandler} /> Missions
            <input type="radio" value="Rules" name="tab" onChange={radioChangeHandler} /> Rules
          </div>
          <div>
            {editTab === "Players" && <><div className="card">
              <ul className="list-group list-group-flush">
                <li key="4" className="list-group-item p-3 bg-success text-white"> PLAYER 1 - HUMAN -
                  <button type="button" className="btn pl-5 btn-primary btn-sm">Manage</button>
                </li>
                <li key="5" className="list-group-item p-3 bg-danger text-white"> PLAYER 2 - ZOMBIE -
                  <button type="button" className="btn pl-5 btn-primary btn-sm">Manage</button>
                </li>
              </ul>
            </div></>}
            {editTab === "Missions" && <>
              <ul className="list-group list-group-flush">
                <li key="6" className="list-group-item p-3 bg-secondary text-white"> MISSION 1 - RUN HUMANS RUN -
                  <button type="button" className="btn pl-5 btn-primary btn-sm">Manage</button>
                </li>
                <li key="7" className="list-group-item p-3 bg-secondary text-white"> MISSION 2 - SAFE SPACE
                  <button type="button" className="btn pl-5 btn-primary btn-sm">Manage</button>
                </li>
              </ul></>}
            {editTab === "Rules" && <>Change name:
              <input type="text" value={name.value} onChange={handleNameChange} />
              <button type="button" class="btn btn-success">Save</button></>}
          </div>

        </div> : <>
          <h3 className="text-center">Current games</h3>
          <div className="card">
            <ul className="list-group list-group-flush">
              {games.map((e) => <li key={e.id} className="list-group-item">{e.name} - {e.active} - Current players: {e.players} - {e.date}
                <button type="button" onClick={() => handleEditClick(e)} className="btn pl-5 btn-primary btn-sm">Manage</button>
              </li>)}
            </ul>
          </div>
          <div class="text-center">
            <button type="button" onClick={() => handleCreateGameClick()} class="btn btn-success">+ Create new game</button>

          </div>
        </>}</>}



    </div>
  )
}

export default AdminTools

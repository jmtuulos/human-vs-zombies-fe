import { useEffect, useState } from "react"
import MissionInfo from "../components/AdminComponents/MissionInfo";
import PlayerInfo from "../components/AdminComponents/PlayerInfo";
import {getGame, getAllGames, updateGame, createGame} from "../api/game";
import { listPlayers } from "../api/player";
import NewGameAreaMap from "../components/AdminComponents/NewGameAreaMap";

const AdminTools = () => {

  const [createGameView, setCreateGameView] = useState(false)
  const [name, setName] = useState("");
  const [editTab, setEditTab] = useState("Players")
  const [currentGames, setCurrentGames] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null)
  const [players, setPlayers] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [description, setDescription] = useState(null)
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newMapCoordinates, setNewMapCoordinates] = useState([])
  const [startTime, setStartTime] = useState("00:00")
  const [endTime, setEndTime] = useState("23:59")
  const [startDate, setStartDate] = useState("2023-01-01")
  const [endDate, setEndDate] = useState("2023-03-15")
  const [newGame, setNewGame] = useState({})

  useEffect(() => {

    getAllGames().then(function(value){
      setCurrentGames(value)
    })
  },[])

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    // newMapCoordinates.push({latitude: newMapCoordinates[0].latitude, longitude: newMapCoordinates[0].longitude})
    // createGame({name: newName, description: newDescription, startDateTime: new Date(startDate + "T" +  startTime +"Z"), endDateTime: new Date(endDate + "T" +  endTime +"Z"), mapCoordinates: newMapCoordinates, gameState: "REGISTRATION"})
    // console.log({name: newName, description: newDescription, startDateTime:new Date(startDate + "T" +  startTime +"Z") , endDateTime: new Date(endDate + "T" +  endTime +"Z"), mapCoordinates: newMapCoordinates, gameState: "REGISTRATION"})
    alert("TODO: CREATE GAME FUNCTIONALITY");
  };

  const handleEditClick = (e) => {
    getGame(e.id).then(function(value) {
      setSelectedGame(value)
      setDescription(value.description)
      setName(value.name)
      console.log(value)
    })
    listPlayers(e.id).then(function(value) {
      setPlayers(value)
    })
  }

  const handleExitClick = () => {
    setSelectedGame(null)
    setCreateGameView(false)
    setSelectedPlayer(null)
  }

  const handleCreateGameClick = () => {
    setCreateGameView(true)
    
  }

  const radioChangeHandler = (e) => {
    setEditTab(e.target.value);
  };

  const handlePlayerManageClick = (e) => {
    setSelectedPlayer(e)
  }

  const handleRuleChange = (e) => {
    e.preventDefault()
    // selectedGame.name = name
    // selectedGame.description = description
    // updateGame(selectedGame.id, selectedGame)
    alert("TODO: GAME SETTING CHANGES")
  }

  const getNewMapCoordinates = (coord)=> {
    setNewMapCoordinates(coord)
  }

  return (
    <div className="container my-3 text-left">
      <h3 className="text-center">Admin Tools</h3>
      {createGameView ? <div className="p-7">
        <button type="button" onClick={() => handleExitClick()} className="btn btn-danger text-right">Close</button>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <fieldset >
              <label>
                Game name:
                <input pattern='([A-z0-9À-ž\s]){2,}' value={newName} onChange={(e) => setNewName(e.target.value)}/>
              </label>
              <label>
                Description:
                <input pattern='([A-z0-9À-ž\s]){2,}' value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
              </label>
              <label>
                Start date:
                <input type="date" id="start" name="game-start" onChange={(e) => setStartDate(e.target.value)} value={startDate} min="2023-01-01" max="2025-12-31"></input>
              </label>
              <label>
                Start time
                <input pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$' value={startTime} onChange={(e) => setStartTime(e.target.value)}></input>
              </label>
              <label>
                End date:
                <input type="date" id="end" name="game-end" onChange={(e) => setEndDate(e.target.value)} value={endDate} min="2023-03-15" max="2025-12-31"></input>
              </label>
              <label>
                End time
                <input pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])$' value={endTime} onChange={(e) => setEndTime(e.target.value)}></input>
              </label>
              
              <button type="submit">Create</button>
            </fieldset>
          </div>
        </form>
        <div className="card h-50 w-50 d-inline-block">
            <NewGameAreaMap getCoordinates={getNewMapCoordinates}></NewGameAreaMap>
            </div>

      </div> : <>
        {selectedGame !== null ? <div>
          <button type="button" onClick={() => handleExitClick()} className="btn btn-danger text-right">Close</button>
          <div>
            <input type="radio" value="Players" name="tab" onChange={radioChangeHandler} /> Players
            <input type="radio" value="Missions" name="tab" onChange={radioChangeHandler} /> Missions
            <input type="radio" value="Rules" name="tab" onChange={radioChangeHandler} /> Rules
          </div>
          <div>
            {editTab === "Players" && <><div className="">
              <div className="container">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <ul>
                          {players != null && players.map((e) => 
                            e.isHuman ? 
                            <li key={e.id} className="list-group-item p-3 bg-success text-white"> {e.appUser.firstname} {e.appUser.lastName} - Human
                                <button type="button" onClick={() => handlePlayerManageClick(e)} className="btn pl-5 btn-primary btn-sm">Manage</button>
                              </li> :
                               <li key={e.id} className="list-group-item p-3 bg-danger text-white"> {e.appUser.firstname} {e.appUser.lastName} - Zombie
                                <button type="button" onClick={() => handlePlayerManageClick(e)} className="btn pl-5 btn-primary btn-sm">Manage</button>
                              </li>
                            )}
                            </ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 mb-4">
                      <div className="card">

                        <div className="card-body">
                          <h5 className="card-title">Player Info</h5>
                          {selectedPlayer != null ? <PlayerInfo data={selectedPlayer}></PlayerInfo> : <p>Select player</p>}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div></>}
            {editTab === "Missions" && <div>
              <div className="container">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <ul className="list-group list-group-flush">
                            <li key="6" className="list-group-item p-3 bg-secondary text-white"> MISSION 1 - RUN HUMANS RUN -
                              <button type="button" className="btn pl-5 btn-primary btn-sm">Manage</button>
                            </li>
                            <li key="7" className="list-group-item p-3 bg-secondary text-white"> MISSION 2 - SAFE SPACE
                              <button type="button" className="btn pl-5 btn-primary btn-sm">Manage</button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Mission Info</h5>
                          <MissionInfo></MissionInfo>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>}
            {editTab === "Rules" && <>
            
              {name !== null && description !== null &&
              <form onSubmit={handleRuleChange}>
                <label>Game name:</label>
                <input value={name} onChange={(e) => {
                  setName(e.target.value)
              }} pattern='([A-z0-9À-ž\s]){2,}'></input>
                <label>Description</label>
                <input value={description} onChange={(e) => {
                  setDescription(e.target.value)
              }} pattern='([A-z0-9À-ž\s]){2,}'></input>
              
              <button type="submit">Save</button>
            </form>
            }
            </>
              }
              
          </div>

        </div> : <>
          <h3 className="text-center">Current games</h3>
          <div className="card">
            <ul className="list-group list-group-flush">
              {currentGames != null && currentGames.map((e) => <li key={e.id} className="list-group-item">{e.name} - Current players:
                <button type="button" onClick={() => handleEditClick(e)} className="btn pl-5 btn-primary btn-sm">Manage</button>
              </li>)}
            </ul>
          </div>
          <div className="text-center">
            <button type="button" onClick={() => handleCreateGameClick()} className="btn btn-success">+ Create new game</button>
          </div>
        </>}</>}



    </div>
  )
}

export default AdminTools

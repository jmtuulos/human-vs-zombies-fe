import { useEffect, useState } from "react"
import MissionInfo from "../components/AdminComponents/Mission/MissionInfo";
import PlayerInfo from "../components/AdminComponents/PlayerInfo";
import { getGame, getAllGames } from "../api/game";
import { listPlayers, getPlayer } from "../api/player";
import { getMissions } from "../api/mission";
import MissionForm from "../components/AdminComponents/Mission/MissionForm";
import NewGameForm from "../components/AdminComponents/Game/NewGameForm";
import * as React from 'react';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import GameSettings from "../components/AdminComponents/Game/GameSettings";

//This view holds admin dashboard and contains logic for component rendering and updating

const AdminTools = () => {

  const [createGameView, setCreateGameView] = useState(false)
  const [name, setName] = useState("");
  const [currentGames, setCurrentGames] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null)
  const [players, setPlayers] = useState(null)
  const [missions, setMissions] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [description, setDescription] = useState(null)
  const [selectedMission, setSelectedMission] = useState(null)
  const [newMissionState, setNewMissionState] = useState(false)
  const [value, setValue] = useState(0)
  const [update, setUpdate] = useState(false)
  const [selectedPlayerId, setSelectedPlayerId] = useState(null)

  useEffect(() => {
    getAllGames().then(function (value) {
      setCurrentGames(value)
    })
  }, [update])

  const updateGameView = () => {
    setCurrentGames(null)
    setUpdate(!update)
    setSelectedGame(null)
    setCreateGameView(false)
    setSelectedPlayer(null)
    setMissions(null)
    setNewMissionState(false)
    setSelectedMission(null)
  }

  const updatePlayerList = () => {
    listPlayers(selectedGame.id).then(function (value) {
      setPlayers(value)
    })
    listPlayers(selectedGame.id).then(function (value) {
      value.length > 1 ? setPlayers(value.sort((a, b) => {
        let fa = a.appUser.firstName.toLowerCase(),
          fb = b.appUser.firstName.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })) : setPlayers(value)
    })
  }

  const updateMissionList = () => {
    getMissions(selectedGame.id).then(function (value) {
      setMissions(value)
    })
    getMissions(selectedGame.id).then(function (value) {
      value.length > 1 ? setMissions(value.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })) : setMissions(value)
    })
    setSelectedMission(null)
    setNewMissionState(null)
  }

  const handleEditClick = (e) => {
    getGame(e.id).then(function (value) {
      setSelectedGame(value)
      setDescription(value.description)
      setName(value.name)
    })
    listPlayers(e.id).then(function (value) {
      value.length > 1 ? setPlayers(value.sort((a, b) => {
        let fa = a.appUser.firstName.toLowerCase(),
          fb = b.appUser.firstName.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })) : setPlayers(value)
    })
    getMissions(e.id).then(function (value) {
      value.length > 1 ? setMissions(value.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })) : setMissions(value)
    })
  }

  const handleExitClick = () => {
    setSelectedGame(null)
    setCreateGameView(false)
    setSelectedPlayer(null)
    setMissions(null)
    setNewMissionState(false)
    setSelectedMission(null)
  }

  const handleCancelNewMissionClick = () => {
    setNewMissionState(false)
  }

  const handleCreateGameClick = () => {
    setCreateGameView(true)
  }

  const handlePlayerManageClick = (e) => {
    setSelectedPlayerId(e.id)
    getPlayer(e.id).then(function (value) {
      setSelectedPlayer(value)
    })
  }

  const handleMissionManageClick = (e) => {
    setSelectedMission(e)
  }

  const handleNewMissionClick = () => {
    setNewMissionState(true)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className="container my-3 text-left" >
      <h3 className="text-center">Admin Tools</h3>
      {createGameView ? <div className="p-7" >
        <button type="button" onClick={() => handleExitClick()} className="btn btn-danger text-right">Close</button>
        <NewGameForm updateGameView={updateGameView}></NewGameForm>
      </div> : <>
        {selectedGame !== null ? <div>
          <button type="button" onClick={() => handleExitClick()} className="btn btn-danger text-right">Close</button>
          <div>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs sx={{ backgroundColor: '#e9e3d6a3' }} value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Players" {...a11yProps(0)} />
                  <Tab label="Missions" {...a11yProps(1)} />
                  <Tab label="Game settings" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="container">
                  <div className="container">
                    <div className=" mb-4">
                      <div className="card" style={{ backgroundColor: '#e9e3d6a3' }}>
                        <div className="card-body" style={{ backgroundColor: '#e9e3d6a3' }}>
                          <h5 className="card-title">Player Info</h5>
                          {selectedPlayer != null ? <PlayerInfo updatePlayerList={updatePlayerList} gameId={selectedGame.id} playerId={selectedPlayerId} data={selectedPlayer}></PlayerInfo> : <p>Select player</p>}
                        </div>
                      </div>
                    </div>
                    <div className="row" >
                      <div className=" mb-4" >
                        <div className="card" style={{ backgroundColor: '#e9e3d6a3' }}>
                          <div className="card d-flex justify-content-between p-2" style={{ backgroundColor: '#e9e3d6a3' }}>
                            <div className="text-center">
                              <p className="">Player List</p>
                            </div>
                            <div className="card d-flex justify-content-between" style={{ backgroundColor: '#e9e3d6a3' }}>
                              {players != null && players.map((e) =>
                                e.isHuman ?
                                  <li key={e.id} className="border border-secondary list-group-item p-3 m-1 bg-success text-white d-flex justify-content-between"> {e.appUser.firstName} {e.appUser.lastName} - Human
                                    <button type="button" onClick={() => handlePlayerManageClick(e)} className="btn pl-5 btn-primary btn-sm">Manage</button>
                                  </li> :
                                  <li key={e.id} className="border border-secondary list-group-item p-3 m-1 bg-danger text-white d-flex justify-content-between"> {e.appUser.firstName} {e.appUser.lastName} - Zombie
                                    <button type="button" onClick={() => handlePlayerManageClick(e)} className="btn pl-5 btn-primary btn-sm">Manage</button>
                                  </li>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div>
                  {newMissionState ? <>
                    <button type="button" onClick={() => handleCancelNewMissionClick()} className="btn btn-danger text-right m-2">Cancel</button>
                    <MissionForm updateMissionList={updateMissionList} gameId={selectedGame.id} gameMap={selectedGame.mapCoordinates}></MissionForm>
                  </> : <>
                    <div className="text-center" >
                      <button type="button" className="btn btn-success p-2 m-2" onClick={() => handleNewMissionClick()}>New mission</button>
                    </div>
                    <div className="container">
                      <div className="mb-4">
                        <div className="card" style={{ backgroundColor: '#e9e3d6a3' }}>
                          <div className="card-body" style={{ backgroundColor: '#e9e3d6a3' }}>
                            {selectedMission ? <MissionInfo updateMissionList={updateMissionList} gameId={selectedGame.id} gameMap={selectedGame.mapCoordinates} data={selectedMission}></MissionInfo> : <p>Select mission</p>}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-4">
                          <div className="card" style={{ backgroundColor: '#e9e3d6a3' }}>
                            <div className="text-center" style={{ backgroundColor: '#e9e3d6a3' }}>
                              <p className="pt-2">Mission List</p>
                            </div>
                            <div className="card d-flex justify-content-between p-2" style={{ backgroundColor: '#e9e3d6a3' }}>
                              {missions != null ? missions.map((e) => <li key={e.id} style={{ backgroundColor: '#ECE7DC', color: '#524e45' }} className="border bg-light list-group-item p-3 m-1 bg-gradient text-dark d-flex justify-content-between">{e.name} <button type="button" onClick={() => handleMissionManageClick(e)} className="btn pl-5 btn-primary btn-sm">Manage</button></li>) : <p>No missions yet</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div></>}
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div>
                  {name !== null && description !== null &&
                    <GameSettings updateGameView={updateGameView} gameData={selectedGame}></GameSettings>
                  }
                </div>
              </TabPanel>
            </Box>
          </div>
          <div>
          </div>

        </div> : <>
          <h3 className="text-center p-1 pb-2">Current games</h3>
          <div className="card bg-secondary">
            <ul className="list-group list-group-flush" style={{ backgroundColor: '#e9e3d6a3' }}>
              {currentGames && currentGames.map((e, index) => <div key={index} className="card">
                <li key={index} className="list-group-item p-2 d-flex justify-content-between" style={{ backgroundColor: '#ECE7DC', color: '#524e45' }}>{e.name}  &emsp; &#x25cf; &emsp;  {e.gameState} &emsp; &#x25cf; &emsp; players: {e.playerCount} &emsp; &#x25cf; &emsp; started: {new Date(e.startDateTime).toString().slice(0, 21)}
                  <div>
                    <button type="button" onClick={() => handleEditClick(e)} className="btn pl-5 btn-secondary btn-sm">Manage</button>
                  </div></li>
              </div>)}
            </ul>
          </div>

          <div className="text-center p-2">
            <button type="button" onClick={() => handleCreateGameClick()} className="btn btn-lg btn-success">+ Create new game</button>
          </div>
        </>}</>}

    </div>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default AdminTools
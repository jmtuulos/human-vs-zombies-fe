import { useEffect, useState } from "react"
import MissionInfo from "../components/AdminComponents/Mission/MissionInfo";
import PlayerInfo from "../components/AdminComponents/PlayerInfo";
import { getGame, getAllGames, updateGame, createGame } from "../api/game";
import { listPlayers, getPlayer } from "../api/player";
import NewGameAreaMap from "../components/AdminComponents/NewGameAreaMap";
import { createMission, getMissions } from "../api/mission";
import MissionAdminMap from "../components/AdminComponents/Mission/MissionAdminMap";
import MissionForm from "../components/AdminComponents/Mission/MissionForm";
import NewGameForm from "../components/AdminComponents/NewGameForm";
import * as React from 'react';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import GameSettings from "../components/AdminComponents/GameSettings";




const AdminTools = () => {

  const [createGameView, setCreateGameView] = useState(false)
  const [name, setName] = useState("");
  const [editTab, setEditTab] = useState("Players")
  const [currentGames, setCurrentGames] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null)
  const [players, setPlayers] = useState(null)
  const [missions, setMissions] = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [description, setDescription] = useState(null)
  const [selectedMission, setSelectedMission] = useState(null)
  const [newMissionState, setNewMissionState] = useState(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    getAllGames().then(function (value) {
      setCurrentGames(value)
    })
  }, [])


  const handleEditClick = (e) => {
    getGame(e.id).then(function (value) {
      setSelectedGame(value)
      setDescription(value.description)
      setName(value.name)
    })
    listPlayers(e.id).then(function (value) {
      setPlayers(value)
    })
    getMissions(e.id).then(function (value) {
      setMissions(value)
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
    // event.preventDefault()
    setValue(newValue)
  }

  return (
    <div className="container my-3 text-left">
      <h3 className="text-center">Admin Tools</h3>
      {createGameView ? <div className="p-7">
        <button type="button" onClick={() => handleExitClick()} className="btn btn-danger text-right">Close</button>
        <NewGameForm ></NewGameForm>
      </div> : <>
        {selectedGame !== null ? <div>
          <button type="button" onClick={() => handleExitClick()} className="btn btn-danger text-right">Close</button>
          <div>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Players" {...a11yProps(0)} />
                  <Tab label="Missions" {...a11yProps(1)} />
                  <Tab label="Game settings" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
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
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div>
                  {newMissionState ? <>
                    <button type="button" onClick={() => handleCancelNewMissionClick()} className="btn btn-danger text-right">Cancel</button>
                    <MissionForm gameId={selectedGame.id} gameMap={selectedGame.mapCoordinates}></MissionForm>
                  </> : <><button type="button" onClick={() => handleNewMissionClick()}>New mission</button>
                    <div className="container">
                      <div className="col-lg-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Mission Info</h5>
                            {selectedMission != null ? <MissionInfo gameId={selectedGame.id} gameMap={selectedGame.mapCoordinates} data={selectedMission}></MissionInfo> : <p>Select mission</p>}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 mb-4">
                          <div className="card">
                            <div className="card-body">
                              <ul>
                                {missions != null ? <p>No missions yet</p> : missions.map((e) => <li key={e.id} className="list-group-item p-3 bg-secondary text-white">{e.name} <button type="button" onClick={() => handleMissionManageClick(e)} className="btn pl-5 btn-primary btn-sm">Manage</button></li>)}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div></>}
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                {name !== null && description !== null &&
                  <GameSettings gameData={selectedGame}></GameSettings>
                }
              </TabPanel>
            </Box>
          </div>
          <div>
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
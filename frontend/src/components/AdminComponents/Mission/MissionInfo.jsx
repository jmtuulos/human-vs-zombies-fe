import { useState, useEffect } from "react";
import MissionInfoMap from "./MissionInfoMap"
import { updateMission } from "../../../api/mission";
import { Button, FormControlLabel, FormControl, FormGroup, Checkbox } from "@mui/material";
import MissionAdminMap from "./MissionAdminMap";
import { Alert } from "@mui/material"
import { useMutation } from "@tanstack/react-query";

const MissionInfo = ({ updateMissionList, gameId, data, gameMap }) => {

    const [editState, setEditState] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [humanVisible, setHumanVisible] = useState(null)
    const [zombieVisible, setZombieVisible] = useState(null)
    const [newMissionCoordinates, setNewMissionCoordinates] = useState([])
    const [showMap, setShowMap] = useState(false)
    const [missionId, setMissionId] = useState(data.id)
    const marker = ([data.latitude, data.longitude])

    useEffect(() => {
        setEditState(false)
        setName(data.name)
        setDescription(data.description)
        setHumanVisible(data.isHumanVisible)
        setZombieVisible(data.isZombieVisible)
        setShowSuccess(false)
    }, [data]);

    const { mutate } = useMutation({
        mutationFn: (missionData) => updateMission(gameId, missionId, missionData),
        onError: (error) => {
            setShowError(true)
            console.log("Error happened in editing mission", error)
        },
        onSuccess: () => {
            setShowError(false)
            setTimeout(() => {
                setShowSuccess(false)
                setEditState(false)
                updateMissionList()
            }, 750);
            setShowSuccess(true)
        }
    })

    const handleSave = (event) => {
        event.preventDefault();

        const newMissionEmpty = (newMissionCoordinates.latitude !== undefined && newMissionCoordinates.longitude !== undefined)

        mutate({
            "name": name,
            "isHumanVisible": humanVisible,
            "isZombieVisible": zombieVisible,
            "description": description,
            "startTime": data.startTime,
            "endTime": data.endTime,
            "latitude": (newMissionEmpty ? newMissionCoordinates.latitude : data.latitude),
            "longitude": (newMissionEmpty ? newMissionCoordinates.longitude : data.longitude)
        })
    }

    const handleHumanCheckBox = () => {
        setHumanVisible(!humanVisible)
    }

    const handleZombieCheckBox = () => {
        setZombieVisible(!zombieVisible)
    }

    const handleEditClick = () => {
        setEditState(!editState)
        setShowMap(false)
    }


    const getNewMissionCoordinates = (coord) => {
        console.log(coord)
        setNewMissionCoordinates(coord)
    }

    const handleShowMap = () => {
        setShowMap(!showMap)
    }

    return <>
        <div>
            <div className="d-flex justify-content-between">
                <h5 className="card-title">Mission Info</h5>
                <button className="btn btn-sm btn-primary" variant="contained" onClick={() => handleEditClick()}>{editState ? "Cancel" : "Edit Mission"}</button>
            </div>
            <div className="card mt-3 p-1 bg-light">
                {editState ? <>
                    <form onSubmit={handleSave}>
                        <FormGroup>
                            <FormControl>
                                <label className=" m-2" >
                                    Mission name*
                                    <input className="form-control" required minLength={"2"} maxLength={"50"} pattern="([A-z0-9À-ž\s!?.,'#@\-]){2,}" value={name} onChange={(e) => setName(e.target.value)} />
                                </label>
                                <label className="m-2">
                                    Mission description*
                                    <input className="form-control" required multiline="true" minLength={"2"} maxLength={"200"} pattern="([A-z0-9À-ž\s!?.,'#@\-]){2,}" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </label>
                                <label>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox value={humanVisible} onChange={() => handleHumanCheckBox()} defaultChecked />} label="Human visible" />
                                        <FormControlLabel control={<Checkbox value={zombieVisible} onChange={() => handleZombieCheckBox()} defaultChecked />} label="Zombie visible" />
                                    </FormGroup>
                                </label>
                                <div>
                                    <Button onClick={() => handleShowMap()}>{showMap ? "Close map" : "Show map"}</Button>
                                    {showMap && <MissionAdminMap currentMarker={{ longitude: data.longitude, latitude: data.latitude }} gameMap={gameMap} getNewMissionCoordinates={getNewMissionCoordinates}></MissionAdminMap>}
                                </div>
                                <div className="text-center p-2">

                                    <Button type="submit" variant="contained">Save mission</Button>

                                </div>

                            </FormControl>
                        </FormGroup>
                        <div className="d-flex justify-content-center m-2">
                            <div className="w-50">
                                {showSuccess && <Alert severity="success" onClose={() => { setShowSuccess(false) }}>Mission edited!</Alert>}
                                {showError && <Alert severity="error" onClose={() => { setShowError(false) }}>Error: Mission edit failed. Try again.</Alert>}
                            </div>
                        </div>
                    </form>

                </> : <>
                    <div className="p-2">
                        <p>Mission name: {data.name}</p>
                        <p>Mission description: {data.description}</p>
                        <p>Visible for humans: {data.isHumanVisible ? "True" : "False"}</p>
                        <p>Visible for zombies: {data.isZombieVisible ? "True" : "False"}</p>
                        {marker[0] !== null || marker[1] !== null ?
                            <>  Map position:
                                <Button onClick={() => handleShowMap()}>{showMap ? "Close map" : "Show map"}</Button>
                                {showMap && <MissionInfoMap gameMap={gameMap} marker={marker}></MissionInfoMap>}
                            </>

                            : <p>This mission does not have map marker</p>}
                    </div>
                </>}
            </div>
        </div>
    </>;
}

export default MissionInfo;
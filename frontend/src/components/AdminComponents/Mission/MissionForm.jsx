import MissionAdminMap from "./MissionAdminMap";
import { Checkbox, FormGroup, FormControlLabel, FormControl, Alert } from "@mui/material"
import { useState } from "react";
import { createMission } from "../../../api/mission";
import { useMutation } from "@tanstack/react-query";

const MissionForm = ({ updateMissionList, gameMap, gameId }) => {


    const [newName, setNewName] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [startTime, setStartTime] = useState("00:00")
    const [endTime, setEndTime] = useState("23:59")
    const [startDate, setStartDate] = useState("2023-01-01")
    const [endDate, setEndDate] = useState("2023-03-15")
    const [humanVisible, setHumanVisible] = useState(true)
    const [zombieVisible, setZombieVisible] = useState(true)
    const [newMissionCoordinates, setNewMissionCoordinates] = useState([])

    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const getNewMissionCoordinates = (coord) => {
        setNewMissionCoordinates(coord)
    }

    const { mutate } = useMutation({
        mutationFn: (missionData) => createMission(gameId, missionData),
        onError: (error) => {
            setShowError(true)
            console.log("Error happened in mission creation", error)
        },
        onSuccess: () => {
            setShowSuccess(true)
            setShowError(false)
            setTimeout(() => {
                setShowSuccess(false)
                updateMissionList()
            }, 1000);
        }
    })

    const handleNewMissionSubmit = (event) => {
        event.preventDefault();
        mutate({
            "name": newName,
            "isHumanVisible": humanVisible,
            "isZombieVisible": zombieVisible,
            "description": newDescription,
            "startTime": new Date(startDate + "T" + startTime + "Z"),
            "endTime": new Date(endDate + "T" + endTime + "Z"),
            "latitude": newMissionCoordinates.latitude,
            "longitude": newMissionCoordinates.longitude
        })
    }

    const handleHumanCheckBox = () => {
        setHumanVisible(!humanVisible)
    }

    const handleZombieCheckBox = () => {
        setZombieVisible(!zombieVisible)
    }

    return <>
        <h5 className="text-center" >New mission</h5>
        <form onSubmit={handleNewMissionSubmit}>
            <FormGroup>
                <FormControl>
                    <div className="card p-2" style={{ backgroundColor: '#e9e3d6a3' }}>
                        <p className="text-center">Mission</p>
                        <label className="m-2" >
                            Mission name*
                            <input className="form-control" required minLength={"2"} maxLength={"50"} pattern="([A-z0-9À-ž\s!?.,'#@\-]){2,}" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        </label>
                        <label className="m-2">
                            Mission description*
                            <input className="form-control" required multiline="true" minLength={"2"} maxLength={"200"} pattern="([A-z0-9À-ž\s!?.,'#@\-]){2,}" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                        </label>
                        <label className="m-2">
                            Start date*
                            <input type="date" id="start" required className="form-control" name="mission-start" onChange={(e) => setStartDate(e.target.value)} value={startDate} min="2023-01-01" max="2025-12-31"></input>
                        </label>

                        <label className=" m-2">
                            Start time*
                            <input className="form-control" required pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </label>

                        <label className="m-2">
                            End date*
                            <input type="date" id="end" required className="form-control" name="mission-end" onChange={(e) => setEndDate(e.target.value)} value={endDate} min="2023-03-15" max="2025-12-31"></input>
                        </label>
                        <label className="m-2">
                            End time*
                            <input className="form-control" required pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])$' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </label>
                        <label className="m-2">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value={humanVisible} onChange={() => handleHumanCheckBox()} defaultChecked />} label="Human visible" />
                                <FormControlLabel control={<Checkbox value={zombieVisible} onChange={() => handleZombieCheckBox()} defaultChecked />} label="Zombie visible" />
                            </FormGroup>
                        </label>
                        Map marker(optional)
                        <div className="card d-inline-block">
                            <MissionAdminMap getNewMissionCoordinates={getNewMissionCoordinates} gameMap={gameMap}></MissionAdminMap>
                        </div>
                        <div className="text-center pt-2">
                            <button className="btn btn-primary" type="submit">Create mission</button>
                        </div>
                        <div className="text-center d-flex justify-content-center">
                            <div className="card w-75 text-center">
                                {showSuccess && <Alert severity="success" onClose={() => { setShowSuccess(false) }}>Mission created!</Alert>}
                                {showError && <Alert severity="error" onClose={() => { setShowError(false) }}>Something went wrong in mission creation. Try again.</Alert>}
                            </div>
                        </div>
                    </div>
                </FormControl>
            </FormGroup>
        </form>

    </>;
}

export default MissionForm;

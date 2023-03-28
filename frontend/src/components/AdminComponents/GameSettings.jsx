import { useState } from "react";
import { TextField, Button, FormControl, FormGroup } from "@mui/material";
import { updateGame } from "../../api/game";


const GameSettings = ({ gameData }) => {

    const getTime = (date) => {
        console.log(date.getHours())
        if (date.getHours() < 10 && date.getMinutes() < 10)
            return "0" + date.getHours() + ':' + "0" + date.getMinutes();
        if (date.getHours() < 10)
            return "0" + date.getHours() + ':' + date.getMinutes();
        if (date.getMinutes() < 10)
            return date.getHours() + ':' + "0" + date.getMinutes();
    }

    const getDateString = (date) => {
        console.log(date.getMonth())
        if (date.getMonth() < 9 && date.getDay() < 10) {
            console.log(date.getFullYear() + "-" + date.getMonth() + 1 + "-0" + date.getDay())
            return date.getFullYear() + "-0" + date.getMonth() + 1 + "-0" + date.getDay()
        }

        if (date.getMonth() < 9) {
            console.log(date.getFullYear() + "-0" + date.getMonth() + 1 + "-" + date.getDay())
            return date.getFullYear() + "-0" + date.getMonth() + 1 + "-" + date.getDay()
        }

        if (date.getDay() < 10) {
            console.log(date.getFullYear() + "-" + date.getMonth() + 1 + "-0" + date.getDay())
            return date.getFullYear() + "-" + date.getMonth() + 1 + "-0" + date.getDay()
        }

    }

    const [name, setName] = useState(gameData.name);
    const [description, setDescription] = useState(gameData.description)
    const [startTime, setStartTime] = useState(getTime(new Date(gameData.startDateTime)))
    const [startDate, setStartDate] = useState(getDateString(new Date(gameData.startDateTime)))
    const [endTime, setEndTime] = useState(getTime(new Date(gameData.endDateTime)))
    const [endDate, setEndDate] = useState(getDateString(new Date(gameData.endDateTime)))
    const [editTime, setEditTime] = useState(false)

    const handleRuleChange = (e) => {
        e.preventDefault()
        gameData.name = name;
        gameData.description = description;
        gameData.startDateTime = new Date(startDate + "T" + startTime + "Z")
        gameData.endDateTime = new Date(endDate + "T" + endTime + "Z")
        updateGame(gameData.id, gameData)
        alert("GAME EDITED")
    }

    const handleEditTime = () => {
        setEditTime(!editTime)
    }

    return <>
        <form onSubmit={handleRuleChange}>
            <FormGroup>
                <FormControl>
                    <div className="card bg-light">
                        <div className="mt-3 text-center">
                            <p className="font-weight-bold">Edit game settings</p>
                        </div>

                        <TextField className="bg-white m-2" id="outlined-basic" label="Mission name" variant="outlined" pattern='([A-z0-9À-ž\s]){2,}' value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField className="bg-white m-2" id="outlined-basic" multiline label="Mission Description" variant="outlined" pattern='([A-z0-9À-ž\s]){2,}' value={description} onChange={(e) => setDescription(e.target.value)} />

                        <label className="m-2">
                            Start date:
                            <input type="date" id="start" className="form-control" name="game-start" onChange={(e) => setStartDate(e.target.value)} value={startDate} min="2023-03-15" max="2025-12-31"></input>
                        </label>
                        <TextField className="bg-white m-2" id="outlined-basic" label="Start time" variant="outlined" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        <label className="m-2">
                            End date:
                            <input type="date" id="end" className="form-control" name="game-end" onChange={(e) => setEndDate(e.target.value)} value={endDate} min="2023-03-15" max="2025-12-31"></input>
                        </label>
                        <TextField className="bg-white m-2" id="outlined-basic" label="End time" variant="outlined" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])$' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        <div className="text-center">
                            <Button className="m-2" type="submit" variant="contained">Save settings</Button>
                        </div>
                    </div>
                </FormControl>
            </FormGroup>
        </form>
    </>;
}

export default GameSettings;
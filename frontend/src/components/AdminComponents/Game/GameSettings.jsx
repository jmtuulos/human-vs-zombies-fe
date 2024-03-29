import { useState } from "react";
import { Button, FormControl, FormGroup, Alert } from "@mui/material";
import { updateGame } from "../../../api/game";
import { useMutation } from "@tanstack/react-query";

//This component is used for changing game settings

const GameSettings = ({ updateGameView, gameData }) => {

    const getTime = (date) => {
        if (date.getHours() < 10 && date.getMinutes() < 10)
            return "0" + date.getHours() + ':' + "0" + date.getMinutes();
        if (date.getHours() < 10)
            return "0" + date.getHours() + ':' + date.getMinutes();
        if (date.getMinutes() < 10)
            return date.getHours() + ':' + "0" + date.getMinutes();
    }

    const getDateString = (date) => {
        return date.toLocaleString("default", { year: "numeric" }) + "-" + date.toLocaleString("default", { month: "2-digit" }) + "-" + date.toLocaleString("default", { day: "2-digit" })
    }

    const [name, setName] = useState(gameData.name);
    const [description, setDescription] = useState(gameData.description)
    const [startTime, setStartTime] = useState(getTime(new Date(gameData.startDateTime)))
    const [startDate, setStartDate] = useState(getDateString(new Date(gameData.startDateTime)))
    const [endTime, setEndTime] = useState(getTime(new Date(gameData.endDateTime)))
    const [endDate, setEndDate] = useState(getDateString(new Date(gameData.endDateTime)))
    const [gameId, setGameId] = useState(gameData.id)

    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const { mutate } = useMutation({
        mutationFn: (gameData) => updateGame(gameId, gameData),
        onError: (error) => {
            console.log("Error happened in game edition", error)
            setShowError(true)
        },
        onSuccess: () => {
            setShowError(false)
            setTimeout(() => {
                updateGameView()
            }, 1500);
            setShowSuccess(true)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        gameData.name = name;
        gameData.description = description;
        gameData.startDateTime = new Date(startDate + "T" + startTime + "Z")
        gameData.endDateTime = new Date(endDate + "T" + endTime + "Z")
        mutate(gameData)
    }

    return <>
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <FormControl>
                    <div className="card p-4" style={{ backgroundColor: '#e9e3d6a3' }}>
                        <div className="mt-3 text-center">
                            <p className="font-weight-bold">Edit game settings</p>
                        </div>

                        <label className="m-2">
                            Game name*
                            <input className="form-control" minLength={"2"} maxLength={"50"} required pattern="([A-z0-9À-ž\s!?.,'#@\-]){2,}" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="m-2">
                            Game description*
                            <input className="form-control" minLength={"10"} maxLength={"1000"} required multiline="true" label="Game Description" variant="outlined" pattern="([A-z0-9À-ž\s!?.,'#@\-]){2,}" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </label>
                        <label className="m-2">
                            Start date*
                            <input type="date" id="start" required className="form-control" name="game-start" onChange={(e) => setStartDate(e.target.value)} value={startDate} min="2023-01-01" max="2025-12-31"></input>
                        </label>

                        <label className="m-2">
                            Start Time*
                            <input className="form-control" required label="Start time" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </label>

                        <label className="m-2">
                            End date*
                            <input type="date" id="end" required className="form-control" name="game-end" onChange={(e) => setEndDate(e.target.value)} value={endDate} min="2023-03-15" max="2025-12-31"></input>
                        </label>

                        <label className="m-2">
                            End Time*
                            <input className="form-control" required label="End time" pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </label>
                        <div className="text-center">
                            <Button className="m-2" type="submit" variant="contained">Save settings</Button>
                        </div>
                        <div className="text-center d-flex justify-content-center">
                            <div className="w-75 text-center">
                                {showSuccess && <Alert severity="success" onClose={() => { setShowSuccess(false) }}>Game edited!</Alert>}
                                {showError && <Alert severity="error" onClose={() => { setShowError(false) }}>Something went wrong in editing game. Try again.</Alert>}
                            </div>
                        </div>
                    </div>
                </FormControl>
            </FormGroup>
        </form>
    </>;
}

export default GameSettings;
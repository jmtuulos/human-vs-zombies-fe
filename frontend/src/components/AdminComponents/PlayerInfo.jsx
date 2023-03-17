import { useState } from "react";


const PlayerInfo = (data) => {
    console.log(data.data)

    const [biteCode, setBiteCode] = useState("")

    const handleBite = (e) => {
        e.preventDefault()
    }

    return <>
        <p>Player name: {data.data.appUser.firstname} {data.data.appUser.lastName}</p>
        <p>Bite code: {data.data.biteCode}</p>
        
        <form onSubmit={handleBite}>
                    <input value={biteCode} onChange={(e) => {
                        setBiteCode(e.target.value)
                    }} pattern="[a-zA-Z0-9\s]+"></input>
                    <button type="submit">BITE</button>
        </form>
        </>;
}

export default PlayerInfo;
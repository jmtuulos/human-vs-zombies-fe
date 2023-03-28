import { useState } from "react";


const PlayerInfo = ({ data }) => {

    const [biteCode, setBiteCode] = useState("")

    const handleBite = (e) => {
        e.preventDefault()
    }

    return <>
        <p>Player name: {data.fullName}</p>
        {data.isHuman ?
            <div>
                <p>Player is currently: HUMAN</p>
                <p>Bite code: {data.biteCode}</p>
            </div>
            : <>
                <div>
                    <p>Player is currently: ZOMBIE</p>

                </div></>}



    </>;
}

export default PlayerInfo;
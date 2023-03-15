const LandingPage = () => {

  const games = [{ id: "1", name: "Zombie Mayhem", active: "Active", players: "20", date: "13.3.2023" },
  { id: "2", name: "Zombie invasion", active: "Active", players: "100", date: "13.3.2023" },
  { id: "3", name: "Running zombies", active: "Active", players: "10", date: "13.3.2023" }
  ]

  const handleSelectClick = (e) => {
    console.log(e)
  }

  return (
    <div>
      <h1 className="text-center">Landing Page</h1>
      <h3 className="text-center">Current games</h3>
      <div className="card">
        <ul className="list-group list-group-flush">
          {games.map((e) => <li key={e.id} className="list-group-item">{e.name} - {e.active} - Current players: {e.players} - {e.date}
            <button type="button" onClick={() => handleSelectClick(e)} className="btn pl-5 btn-primary btn-sm">Select</button>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

export default LandingPage

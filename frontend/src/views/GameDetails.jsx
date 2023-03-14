import BiteCodeForm from "../components/Gamedetails/BiteCodeForm"
import ChatTabs from "../components/Gamedetails/Chat/ChatTabs"

const GameDetails = () => {
  return (
    <div className="p-7">
      <div className="container p-3 my-3">
        <div className="row border">
          <div className="col-12">
            <h1>Game Title</h1>
            <div><h3 className="text-muted">Description</h3> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsus</div>
            <div><h3 className="text-muted">Rules</h3> lorem ipsum lorem impsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</div>
          </div>
        </div>
        <div className="row pt-5">
          <h3>Bit a Human?</h3>
          <BiteCodeForm/>
        </div>
        <div>
          <ChatTabs/>
        </div>

      </div>
    </div>
  )
}

export default GameDetails

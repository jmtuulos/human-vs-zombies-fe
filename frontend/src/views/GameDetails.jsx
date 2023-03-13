import BiteCodeForm from "../components/Gamedetails/BiteCodeForm"
import ChatTabs from "../components/Gamedetails/Chat/ChatTabs"

const GameDetails = () => {
  return (
    <div class="p-7">
      <div class="container p-3 my-3">
        <div class="row border">
          <div class="col-12">
            <h1>Game Title</h1>
            <p><h3 class="text-muted">Description</h3> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsus</p>
            <p><h3 class="text-muted">Rules</h3> lorem ipsum lorem impsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
          </div>
        </div>
        <div class="row pt-5">
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

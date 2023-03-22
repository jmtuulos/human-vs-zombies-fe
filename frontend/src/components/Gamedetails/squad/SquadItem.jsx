import { Button } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { joinSquad } from "../../../api/squad"

export const SquadItem = ({ squad, gameId }) => {
  const squadId = squad.squadMembers[0].squadId
  
  const { isError, isLoading, data, error, refetch } = useQuery(
    { queryKey: ['joinsquad', squadId],
    queryFn: () => joinSquad(gameId, squadId),
    enabled: false
  })

  const handleClick = () => (
    //joinsquad here
    refetch()
  )
    //add membercount and list of deceiced members to the squd details line
  return (
      <li className="list-group-item">
        <h4>{squad.name}</h4>
        <Button variant="contained"
          color="success"
          onClick={handleClick}
        >
          join
        </Button>
      </li>
  )
}

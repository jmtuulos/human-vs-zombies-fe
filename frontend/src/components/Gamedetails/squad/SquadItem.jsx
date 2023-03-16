import { Button } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { joinSquad } from "../../../api/squad"

export const SquadItem = ({ squad, gameId }) => {

  const { isError, isLoading, data, error, refetch } = useQuery(
    { queryKey: ['joinsquad', squad.id],
    queryFn: () => joinSquad(gameId, squad.id),
    enabled: false
  })

  const handleClick = () => (
    refetch()
  )

  return (
    <div>
      <li key={squad.id} class="list-group-item">
        <h4>{squad.name}</h4>
        <Button variant="contained"
          color="success"
          onClick={handleClick}
        >
          join
        </Button>
      </li>
    </div>
  )
}

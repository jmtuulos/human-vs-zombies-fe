import { useQuery } from "@tanstack/react-query"
import { listPlayers } from "../../api/player"

export const NumberOfPlayers = (game) => {
  console.log(game.id)
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['players', game.id],
    queryFn: () => listPlayers(game.id),
    staleTime: 10000
  })
  if (data)
    return data.length
  else
    return 0
}

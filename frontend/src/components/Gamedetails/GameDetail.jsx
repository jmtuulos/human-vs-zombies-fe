import { QueryClient, useQuery } from "@tanstack/react-query";
import { getGame } from "../../api/game";

export const GameDetail = () => {
  const gameId = 2
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['title', gameId],
    queryFn: () => getGame(gameId),
    staleTime: 10000
  })
  console.log(isError)
  console.log(isLoading)
  console.log(error)
  console.log(data)
  return (
  <div className="row border">
    <div className="col-12">
      {data && <h1>{data.name}</h1>}
      {data && <p>{data.description}</p>}
      {data && <div><h3 className="text-muted">Rules</h3> Do not be overphysical and do not fight</div>}
    </div>
  </div>
  )
}

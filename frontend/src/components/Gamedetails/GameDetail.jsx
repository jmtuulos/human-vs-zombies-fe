import { QueryClient, useQuery } from "@tanstack/react-query";
import { getGame } from "../../api/game";
import { storageRead } from "../../utils/storage";

export const GameDetail = () => {
  const gameId = storageRead("gameId")
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
    {data && <div className="col-12">
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <div><h3 className="text-muted">Rules</h3> Do not be overphysical and do not fight</div>
    </div>}
  </div>
  )
}

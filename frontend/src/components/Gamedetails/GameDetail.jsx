import { QueryClient, useQuery } from "@tanstack/react-query";
import { getGame } from "../../api/game";
import { storageRead } from "../../utils/storage";
import Map from "./Map";

export const GameDetail = () => {
  const gameId = storageRead("gameId")
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['title', gameId],
    queryFn: () => getGame(gameId),
    staleTime: 10000
  })

  return (
  <div className="row border">
    {data && <>
      <div className="col-12">
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <div><h3 className="text-muted">Rules</h3> Do not be overphysical and do not fight</div>
      </div>
      <div className="row pt-5 h-50 w-100 d-inline-block">
      <Map coordinates={data.mapCoordinates} />
      </div>
    </>
    }
  </div>
  )
}

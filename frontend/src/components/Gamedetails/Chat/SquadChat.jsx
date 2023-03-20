import { useQuery } from '@tanstack/react-query';
import { getSquadChat } from '../../../api/squad';
import { ChatMessage } from './ChatMessage';

export const SquadChat = () => {
  //globalchat getter is missing this is showing squadchat
  const playerId = 1
  const gameId = 1
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['squadchat', gameId],
    queryFn: () => getSquadChat(gameId, playerId),
    staleTime: 1000
  })

  return ChatMessage(data)
}

export default SquadChat

import { getFactionChat } from '../../../api/game';
import { useQuery } from '@tanstack/react-query';
import { ChatMessage } from './ChatMessage';

export const FactionChat = () => {
  const playerId = 1
  const gameId = 1
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['factionchat', gameId],
    queryFn: () => getFactionChat(gameId, playerId),
    staleTime: 1000
  })
  console.log(data)
    if (data !== undefined)
    data.map((message) => {
      if (message.humanGlobal && message.zombieGlobal)
        data.pop(message)
      return message
    })
  console.log(data)
  return ChatMessage(data)
}

export default FactionChat

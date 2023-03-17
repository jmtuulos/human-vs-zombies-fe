
import { useQuery } from '@tanstack/react-query';
import { ChatMessage } from './ChatMessage';
import { getFactionChat } from '../../../api/game';

export const GlobalChat = () =>{
  const playerId = 1
  const gameId = 1
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['globalchat', gameId],
    queryFn: () => getFactionChat(gameId, playerId),
    staleTime: 1000
  })
  console.log(data)
  if (data !== undefined)
    data.map((message) => {
      if (!(message.humanGlobal && message.zombieGlobal))
        data.pop(message)
      return message
    }

  )
  return ChatMessage(data)
}

export default GlobalChat

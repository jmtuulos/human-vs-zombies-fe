
import { useQuery } from '@tanstack/react-query';
import { ChatMessage } from './ChatMessage';
import { getFactionChat } from '../../../api/game';
import { storageRead } from '../../../utils/storage';

export const GlobalChat = () =>{
  const playerId = 1
  const gameId = storageRead('gameId')
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['globalchat', gameId],
    queryFn: () => getFactionChat(gameId, playerId),
    staleTime: 1000
  })
  if (data !== undefined)
    data.map((message) => {
      if (!(message.humanGlobal && message.zombieGlobal))
        data.pop(message)
      return message
    })
    return ChatMessage(data)
}

export default GlobalChat

import { getFactionChat } from '../../../api/game';
import { useQuery } from '@tanstack/react-query';
import { ChatMessage } from './ChatMessage';
import { storageRead } from '../../../utils/storage';

export const FactionChat = () => {
  const playerId = 1
  const gameId = storageRead('gameId')
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['factionchat', gameId],
    queryFn: () => getFactionChat(gameId, playerId),
    staleTime: 1000
  })
    if (data)
      data.map((message) => {
        if (message.humanGlobal && message.zombieGlobal)
          data.pop(message)
        return message
      })

  return ChatMessage(data)
}

export default FactionChat

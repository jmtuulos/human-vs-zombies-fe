
import { useQuery } from '@tanstack/react-query';
import { ChatMessage } from './ChatMessage';
import { getFactionChat } from '../../../api/game';
import { storageRead } from '../../../utils/storage';

export const GlobalChat = () =>{
  const playerId = 1
  const gameId = storageRead('gameId')
  let filteredMessages = []

  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['globalchat', gameId],
    queryFn: () => getFactionChat(gameId, playerId),
    refetchInterval: 1000,
    staleTime: 1000
  })

  if (data !== undefined)
    filteredMessages = data.filter((message) => message.isHumanGlobal && message.isZombieGlobal)
  return ChatMessage(filteredMessages)
}

export default GlobalChat

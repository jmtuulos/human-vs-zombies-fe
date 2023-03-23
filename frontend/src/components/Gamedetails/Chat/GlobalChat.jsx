
import { useQuery } from '@tanstack/react-query';
import { ChatMessage } from './ChatMessage';
import { getFactionChat } from '../../../api/game';
import { storageRead } from '../../../utils/storage';
import { useUser } from '../../../context/UserContext';

export const GlobalChat = ({ playerId, gameId }) =>{

  let filteredMessages = []

  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['globalchat', gameId],
    queryFn: () => getFactionChat(gameId, playerId),
    refetchInterval: 10000,
    staleTime: 1000
  })

  if (data !== undefined)
    filteredMessages = data.filter((message) => message.isHumanGlobal && message.isZombieGlobal)
  return ChatMessage(filteredMessages)
}

export default GlobalChat

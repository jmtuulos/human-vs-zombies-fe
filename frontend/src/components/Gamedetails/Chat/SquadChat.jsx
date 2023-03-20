import { useQuery } from '@tanstack/react-query';
import { getSquadChat } from '../../../api/squad';
import { storageRead } from '../../../utils/storage';
import { ChatMessage } from './ChatMessage';

export const SquadChat = () => {
  const playerId = 1
  const gameId = storageRead('gameId')
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['squadchat', gameId],
    queryFn: () => getSquadChat(gameId, playerId),
    staleTime: 1000
  })

  return ChatMessage(data)

}

export default SquadChat

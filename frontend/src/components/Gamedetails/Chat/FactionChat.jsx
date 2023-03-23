import { getFactionChat } from '../../../api/game';
import { useQuery } from '@tanstack/react-query';
import { ChatMessage } from './ChatMessage';
import { storageRead } from '../../../utils/storage';
import { Button } from '@mui/material';

export const FactionChat = ({ playerId, gameId }) => {
  let filteredFactionMessages = []

  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['factionchat', gameId],
    queryFn: () => getFactionChat(gameId, playerId),
    staleTime: 1000,
    refetchInterval: 10000
  })

  if (data)
    filteredFactionMessages = data.filter((message) =>
      !(message.isHumanGlobal && message.isZombieGlobal))
  return ChatMessage(filteredFactionMessages)
}

export default FactionChat

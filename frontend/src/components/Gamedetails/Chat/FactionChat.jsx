import { getFactionChat } from '../../../api/game';
import { useQuery } from '@tanstack/react-query';
import { ChatMessage } from './ChatMessage';
import { storageRead } from '../../../utils/storage';
import { Button } from '@mui/material';

export const FactionChat = () => {
  const playerId = 1
  const gameId = storageRead('gameId')
  let filteredFactionMessages = []
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['factionchat', gameId],
    queryFn: () => getFactionChat(gameId, playerId),
    staleTime: 1000
  })
  console.log(data)
  if (data)
    filteredFactionMessages = data.filter((message) => !(message.isHumanGlobal && message.isZombieGlobal))
  return ChatMessage(filteredFactionMessages)
}

export default FactionChat

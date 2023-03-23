import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getSquadChat } from '../../../api/squad';
import { useUser } from '../../../context/UserContext';
import { storageRead } from '../../../utils/storage';
import { ChatMessage } from './ChatMessage';

export const SquadChat = (gameId) => {

  const { user } = useUser()
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['squadchat', gameId],
    queryFn: () => getSquadChat(gameId, user.squadId),
    staleTime: 1000,
    refetchInterval: 10000
  })

  return ChatMessage(data)
}

export default SquadChat

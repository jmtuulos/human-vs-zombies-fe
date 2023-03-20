import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getSquadChat } from '../../../api/squad';
import { storageRead } from '../../../utils/storage';
import { ChatMessage } from './ChatMessage';

export const SquadChat = () => {
  // const bottomRef = useRef(null)
  const playerId = 1
  const gameId = storageRead('gameId')

  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['squadchat', gameId],
    queryFn: () => getSquadChat(gameId, playerId),
    staleTime: 1000,
    refetchInterval: 1000
  })

  //Scroll to bottom of chat
  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: 'smooth'})
  // }, [data])

  return ChatMessage(data)
}

export default SquadChat

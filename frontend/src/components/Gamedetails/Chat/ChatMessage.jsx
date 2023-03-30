import { Button } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { Virtuoso } from "react-virtuoso"

export const ChatMessage = ( msgs ) => {
  // const [msgsList, setMsgs] = useState([msgs])
  const appendInterval = useRef(null)
  const virtuosoRef = useRef(null)
  const [atBottom, setAtBottom] = useState(false)
  const showButtonTimeoutRef = useRef(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    return () => {
      clearInterval(appendInterval.current)
      clearTimeout(showButtonTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    clearTimeout(showButtonTimeoutRef.current)
    if (!atBottom) {
      showButtonTimeoutRef.current = setTimeout(() => setShowButton(true), 500)
    } else {
      setShowButton(false)
    }
  }, [atBottom, setShowButton])

  return (
    <>
    <Virtuoso
    style={{ height: 400 }}
    ref={virtuosoRef}
    initialTopMostItemIndex={999}
    data={msgs}
    atBottomStateChange={(bottom) => {
      clearInterval(appendInterval.current)
      if (bottom) {
        appendInterval.current = setInterval(400)
      }
      setAtBottom(bottom)
    }}
      itemContent={(index, user) => {
        const date = new Date(user.chat_time).toString().slice(0, 21) // cut the time-zone info off
        return (
          <div
            style={{
              padding: '0.5rem 0.5rem',
            }}
          >
            <h6>{user.player.fullName}</h6>
            <p className='text-muted'style={{lineHeight: '0.1', fontSize: '0.7rem'}}>
              {date}
            </p>
            <div style={{ marginTop: '1rem', lineHeight: '0.5' }}>{user.message}</div>
          </div>
        )
      }}
      followOutput={'auto'}
    />
          {showButton && (
        <Button
          variant="outlined"
          onClick={() => virtuosoRef.current.scrollToIndex({ index: msgs.length - 1, behavior: 'smooth' })}
          style={{ float: 'right', transform: 'translate(-1.5rem, -3rem)' }}
        >
          Bottom
        </Button>
      )}
    </>
  )
}

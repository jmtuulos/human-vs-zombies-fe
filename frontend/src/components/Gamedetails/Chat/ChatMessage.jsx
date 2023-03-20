import { Virtuoso } from "react-virtuoso"

export const ChatMessage = ( data ) => (
  <Virtuoso
    useWindowScroll
    data={data}
    itemContent={(index, user) => {
      const date = new Date(user.chat_time).toUTCString().slice(0, -4)
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
/>
)

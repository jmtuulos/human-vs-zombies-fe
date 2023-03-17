import { Virtuoso } from "react-virtuoso";

export const ChatMessage = ( data ) => (
  <Virtuoso
  useWindowScroll
  data={data}
  itemContent={(index, user) => (
    <div
      style={{
        padding: '0.5rem 0.5rem',
      }}
    >
      <h6>{user.player.appUser.firstName} {user.player.appUser.lastName}</h6>
      <p className='text-muted'style={{lineHeight: '0.2', fontSize: '0.7rem'}}>{user.chat_time}</p>
      <div style={{ marginTop: '1rem' }}>{user.message}</div>
    </div>
  )}
/>
)

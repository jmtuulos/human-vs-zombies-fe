
import { DUMMY_DATA } from './DUMMY_DATA';
import { Virtuoso } from 'react-virtuoso'

const GlobalChat = () =>{
    // console.log(data)
    return (
      <Virtuoso
      useWindowScroll
      data={DUMMY_DATA}
      itemContent={(index, user) => (
        <div
          style={{
            backgroundColor: user.bgColor,
            padding: '0.5rem 0.5rem',
          }}
        >
          <h6>{user.name}</h6>
          <div style={{ marginTop: '1rem' }}>{user.message}</div>
        </div>
      )}
    />
    )
}

export default GlobalChat

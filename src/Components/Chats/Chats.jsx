import { useState, useEffect, useRef } from 'react'
import Message from './Message/Message'
import { io } from 'socket.io-client'
import { Chatdiv } from './styles'

const Chats = ({ name }) => {
  const [message, setMessage] = useState([])
  const [text, setText] = useState('')

  const socketRef = useRef()

  useEffect(() => {
    console.log('Connectinng..')
    socketRef.current = io()
    socketRef.current.on('broadcast', (payload) => {
      console.log('Recieved: ' + payload)
      setMessage((msg) => [...msg, payload])
    })
    return () => {
      console.log('Disconnecting..')
      socketRef.current.disconnect()
    }
  })

  const handleMessageChange = (e) => {
    setText(e.target.value)
  }

  const handleButtonClick = () => {
    const aMessage = {
      name: name,
      text: text,
    }
    socketRef.current.emit('send', aMessage)
    setMessage((msg) => [...msg, aMessage])
    setText('')
  }

  return (
    <Chatdiv>
      <input
        type="text"
        placeholder="メッセージ"
        value={text}
        onChange={handleMessageChange}
      />
      <button disabled={!text} onClick={handleButtonClick}>
        送信
      </button>
      <ul>
        {message.map((msg, i) => {
          return <Message key={i} name={msg.name} text={msg.text} />
        })}
      </ul>
    </Chatdiv>
  )
}

export default Chats

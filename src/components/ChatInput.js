import React, { useRef, useState } from 'react'
import { Button } from '@material-ui/core'
import { ChatInputContainer } from '../styles/ChatInput.style'
import { auth, chCollection } from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [user] = useAuthState(auth)

  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  const sendMessage = e => {
    e.preventDefault()

    if (!channelId) {
      return false
    }

    chCollection
      .doc(channelId)
      .collection('messages')
      .doc(`msg-${uuidv4()}`)
      .set({
        message: input,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        id: `msg-${uuidv4()}`,
        user: user?.displayName,
        profileImg: user?.photoURL,
      })

    chatRef.current.scrollIntoView({
      behavior: 'smooth',
    })

    setInput('')
  }

  return (
    <ChatInputContainer>
      <form>
        <input
          placeholder={`Message #${channelName}`}
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button hidden type='submit' onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput

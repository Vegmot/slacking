import React from 'react'
import { MessageContainer, MessageInfo } from '../styles/Message.style'

const Message = ({ message, createdAt, user, profileImg }) => {
  return (
    <MessageContainer>
      <img src={profileImg} alt={`User ${user}'s profile`} />
      <MessageInfo>
        <h4>
          {user} <span>{new Date(createdAt?.toDate()).toUTCString()}</span>
        </h4>

        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  )
}

export default Message

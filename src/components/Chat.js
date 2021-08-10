import React, { useEffect, useRef } from 'react'
import {
  ChatContainer,
  Header,
  HeaderLeft,
  HeaderRight,
  ChatMessages,
  ChatBottom,
} from '../styles/Chat.style'
import ChatInput from './ChatInput'
import Message from './Message'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { useSelector } from 'react-redux'
import { selectChannelId } from '../features/appSlice'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { chCollection } from '../firebase'

const Chat = () => {
  const chatRef = useRef(null)

  const channelId = useSelector(selectChannelId)
  const [channelDetails] = useDocument(channelId && chCollection.doc(channelId))
  const [channelMessages, loading] = useCollection(
    channelId &&
      chCollection
        .doc(channelId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
  )

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [channelId, loading])

  return (
    <ChatContainer>
      {channelDetails && channelMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>
                  #
                  {channelDetails?.data().name
                    ? channelDetails?.data().name
                    : ''}
                </strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {channelMessages?.docs.map(doc => {
              const { message, createdAt, user, profileImg } = doc.data()

              return (
                <Message
                  key={doc.id}
                  message={message}
                  createdAt={createdAt}
                  user={user}
                  profileImg={profileImg}
                />
              )
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            chatRef={chatRef}
            channelName={
              channelDetails?.data().name ? channelDetails?.data().name : ''
            }
            channelId={channelId}
          />
        </>
      )}
    </ChatContainer>
  )
}

export default Chat

import React from 'react'
import { db } from '../firebase'
import {
  SidebarOptionContainer,
  SidebarOptionChannel,
} from '../styles/SidebarOption.style'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { enterChannel } from '../features/appSlice'

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const chCollection = db.collection('channels')
  const dispatch = useDispatch()

  const addChannel = () => {
    const channelName = prompt('Enter channel name')
    if (channelName) {
      chCollection.doc(`ch-${uuidv4()}`).set({
        name: channelName,
      })
    }
  }

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterChannel({
          channelId: id,
        })
      )
    }
  }

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize='small' style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  )
}

export default SidebarOption

import React from 'react'
import {
  SidebarContainer,
  SidebarHeader,
  SidebarInfo,
} from '../styles/Sidebar.style'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CreateIcon from '@material-ui/icons/Create'
import SidebarOption from './SidebarOption'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import AppsIcon from '@material-ui/icons/Apps'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, chCollection } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const Sidebar = () => {
  const [user] = useAuthState(auth)
  const [channels, loading, error] = useCollection(chCollection)

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Test CH</h2>
          <h3>
            <FiberManualRecordIcon />
            Agamotto
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SidebarOption Icon={InsertCommentIcon} title='Threads' />
      <SidebarOption Icon={InboxIcon} title='Mentions & Reactions' />
      <SidebarOption Icon={DraftsIcon} title='Saved items' />
      <SidebarOption Icon={BookmarkBorderIcon} title='Channel browser' />
      <SidebarOption Icon={PeopleAltIcon} title='People & User groups' />
      <SidebarOption Icon={AppsIcon} title='Apps' />
      <SidebarOption Icon={FileCopyIcon} title='File browser' />
      <SidebarOption Icon={ExpandLessIcon} title='Show less' />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title='Show more' />
      <hr />
      <SidebarOption Icon={AddIcon} title='Add Channel' addChannelOption />
      {channels?.docs.map(doc => (
        <SidebarOption title={doc.data().name} key={doc.id} id={doc.id} />
      ))}
    </SidebarContainer>
  )
}

export default Sidebar

import React from 'react'
import { LoginContainer, LoginInnerContainer } from '../styles/Login.style'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'

const Login = () => {
  const signInWithGoogle = e => {
    e.preventDefault()
    auth.signInWithPopup(provider).catch(e => alert(e.message))
  }

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
          alt='Slack logo'
        />
        <h1>Sign in to Slacking</h1>
        <p>slac.king.com</p>

        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  )
}

export default Login

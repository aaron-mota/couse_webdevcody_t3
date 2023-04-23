import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'
import React from 'react'
import { ImageWrapped } from './ImageWrapped'
import { signIn } from 'next-auth/react'

interface ButtonSignInProps extends ButtonProps {
  component?: React.ElementType,
  service?: string,
}

export const ButtonSignIn = (props: ButtonSignInProps) => {

  if (props.service == 'google') {
    // https://developers.google.com/identity/branding-guidelines
    return (
      <Button
        variant="contained" // need to change theme.ts when changing from "contained" to "outlined"/"text"
        color="googleSignIn"
        startIcon={<ImageWrapped src="/logo-google-transparent.png" alt="Google" width={20} height={20} />}
        onClick={() => {signIn("google").catch(console.error)}} 
        sx={{
          textTransform: 'none',

        }}
        {...props}
      >
        Sign in with Google
      </Button>
    )
  }
  
  return (
    <Button variant="outlined" {...props} >{props.children}</Button>
  )
}

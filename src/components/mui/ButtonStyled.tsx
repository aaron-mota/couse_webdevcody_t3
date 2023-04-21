import { Button, ButtonProps } from '@mui/material'
import React from 'react'

export const ButtonStyled = (props: ButtonProps) => {
  return (
    <Button {...props} >{props.children}</Button>
  )
}

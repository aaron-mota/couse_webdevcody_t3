import { Button, ButtonProps } from '@mui/material'
import React from 'react'

interface ButtonStyledProps extends ButtonProps {
  component?: React.ElementType
}

export const ButtonStyled = (props: ButtonStyledProps) => {
  return (
    <Button {...props} >{props.children}</Button>
  )
}

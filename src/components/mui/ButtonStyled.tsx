import type { ButtonProps } from '@mui/material'
import { Button } from '@mui/material'
import React from 'react'

interface ButtonStyledProps extends ButtonProps {
  component?: React.ElementType,
  // pill?: boolean, // TODO: wasn't working for some reason...
}

export const ButtonStyled = (props: ButtonStyledProps) => {
  return (
    <Button {...props} >{props.children}</Button>
  )
}

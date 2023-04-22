import React from 'react'
import { ButtonStyled } from './ButtonStyled'
import Link, { LinkProps } from 'next/link'
import { ButtonProps } from '@mui/material'

interface LinkButtonProps extends LinkProps {
  buttonProps?: ButtonProps,
  children: React.ReactNode | string
}

const LinkButton = ({buttonProps, ...props}: LinkButtonProps) => {
  return (
    <Link {...props} >
      <ButtonStyled component="a" sx={{p: 1, py: 0.5, ml: -1}} {...buttonProps} >
          {props.children}
      </ButtonStyled>
    </Link>
  )
}

export default LinkButton
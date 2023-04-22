import React from 'react'
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { ButtonStyled } from './ButtonStyled'
import type { ButtonProps } from '@mui/material'

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

export { LinkButton }
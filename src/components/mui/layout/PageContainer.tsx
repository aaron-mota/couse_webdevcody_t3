import { Stack } from '@mui/material'
import React from 'react'

type Props = {
  children: React.ReactNode,
  sx?: {}
}

const PageContainer = ({
  sx,
  children
}: Props) => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{width: 1, height: "100vh", ...sx}}>
      {children}
    </Stack>
  )
}

export { PageContainer }
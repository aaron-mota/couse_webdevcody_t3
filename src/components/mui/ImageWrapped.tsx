import React from 'react'
import type { SxProps } from '@mui/material'
import { Box } from '@mui/material'

interface ImageWrappedProps extends React.ComponentPropsWithoutRef<"img"> {
  sx?: SxProps,
}

const ImageWrapped = (props: ImageWrappedProps) => {
  return (
    <Box component={"img"} {...props} />
  )
}

export { ImageWrapped }
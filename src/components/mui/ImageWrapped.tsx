import React from 'react'
import { Box, SxProps } from '@mui/material'

interface ImageWrappedProps extends React.ComponentPropsWithoutRef<"img"> {
  sx?: SxProps,
}

const ImageWrapped = (props: ImageWrappedProps) => {
  return (
    <Box component={"img"} {...props} />
  )
}

export { ImageWrapped }
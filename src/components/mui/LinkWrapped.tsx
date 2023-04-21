import React from 'react'
import { Box, Link as MUILink, SxProps, LinkProps, Theme } from '@mui/material'
import Link from 'next/link'



interface LinkWrappedProps extends LinkProps {
  newTab?: boolean;
  external?: boolean;
}


export function LinkWrapped({
  href,
  // color = "inherit",
  color = "primary",
  underline = "none",
  className,
  variant,
  sx,
  
  newTab,
  external,

  children,

  ...props
}: LinkWrappedProps) {

  return (
    // rel="noopener noreferrer"  target="_blank"
    newTab ?
      external ?
        <>
          {/* <a href={to} rel="noopener noreferrer" target="_blank" className={className}>
            {children}
          </a> */}
          <Box component={"a"} href={href} rel="noopener noreferrer" target="_blank" className={className} sx={{
            color: "primary.main"
          }}>
            {children}
          </Box>
        </>
      :
        <MUILink component={Link} href={href} rel="noopener noreferrer" target="_blank" color={color} underline={underline} sx={sx} className={className} {...props}>
          {children}
        </MUILink>
    :
      <MUILink component={Link} href={href} color={color} underline={underline} sx={sx} variant={variant} className={className} {...props} >
        {children}
      </MUILink>
  )
}

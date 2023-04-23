import { Avatar, Badge, type BadgeProps, styled } from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react'


const BadgeIndicatorStyled = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


interface BadgeIndicatorProps extends BadgeProps {
  clickable?: boolean;
}


export const UserBadgeIndicator = (props: BadgeIndicatorProps) => {
  const session = useSession()

  return (
    <BadgeIndicatorStyled 
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      sx={{
        cursor: props.clickable ? 'pointer' : 'default',
      }}
      {...props}
    >
      {props.children ? props.children : <Avatar alt={session.data?.user.name ?? ''} src={session.data?.user.image ?? ''} />}
    </BadgeIndicatorStyled>
  )
}

{/* <StyledBadge
  overlap="circular"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  variant="dot"
  >
  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
</StyledBadge> */}
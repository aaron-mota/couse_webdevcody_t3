import type { CardHeaderProps, CardProps, TypographyProps } from '@mui/material'
import { Card, CardHeader, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { UserBadgeIndicator } from './UserBadgeIndicator'
import MoreVert from '@mui/icons-material/MoreVert'
import { useSession } from 'next-auth/react'
import { SignOutDialog } from './SignOutDialog'


interface UserCardProps extends CardProps {
  cardHeaderProps?: CardHeaderProps;
  appBar?: boolean;
  menuItem?: boolean;
}


export const UserCard = ({ appBar, menuItem, cardHeaderProps, ...cardProps }: UserCardProps) => {
  const session = useSession()

  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);

  const handleSignOut = () => {
    setSignOutDialogOpen(true);
  };

  const handleSignOutDialogClose = () => {
    setSignOutDialogOpen(false);
  };


  const titleTypographyProps: TypographyProps = {
    variant: 'body1',
    sx: { fontWeight: 500, opacity: 0.8 },
  };
  

  // notCurrentlyUsed
  if (appBar) {
    return (
      <>
        <Card
          onClick={cardProps.onClick}
          sx={{
            cursor: "pointer",
            border: "none", 
            p: 0,
            "&.MuiCard-root": {
              backgroundColor: "primary.main", 
              border: "none", 
              p: 0,
              boxShadow: "none",
            }
          }}
          {...cardProps}
        >
          <CardHeader
            avatar={<UserBadgeIndicator />}
            action={
              <IconButton aria-label="settings" sx={{mt: 0.8}}>
                <MoreVert />
              </IconButton>
            }
            title={session.data?.user.name}
            subheader={session.data?.user.email}
            titleTypographyProps={titleTypographyProps}
            {...cardHeaderProps}
          />
        </Card>
      </>
    )
  }

  if (menuItem) {
    return (
      <>
        <Card
          sx={{cursor: "pointer"}}
          {...cardProps}
        >
          <CardHeader
            avatar={<UserBadgeIndicator />}
            title={session.data?.user.name}
            subheader={session.data?.user.email}
            titleTypographyProps={titleTypographyProps}
            {...cardHeaderProps}
          />
        </Card>
      </>
    )
  }
  

  return (
    <>
      <Card
        onClick={handleSignOut}
        sx={{cursor: "pointer"}}
        {...cardProps}
      >
        <CardHeader
          avatar={<UserBadgeIndicator />}
          action={
            <IconButton aria-label="settings" sx={{mt: 0.8}}>
              <MoreVert />
            </IconButton>
          }
          title={session.data?.user.name}
          subheader={session.data?.user.email}
          titleTypographyProps={titleTypographyProps}
          {...cardHeaderProps}
        />
      </Card>

      <SignOutDialog
        open={signOutDialogOpen}
        onClose={handleSignOutDialogClose}
      />
    </>
  )
}





import { Button, Card, CardHeader, CardHeaderProps, CardProps, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TypographyProps } from '@mui/material'
import React, { useState } from 'react'
import { BadgeIndicator } from './BadgeIndicator'
import MoreVert from '@mui/icons-material/MoreVert'
import { signOut, useSession } from 'next-auth/react'


interface UserCardProps extends CardProps {
  cardHeaderProps?: CardHeaderProps;
}


export const UserCard = ({ cardHeaderProps, ...cardProps }: UserCardProps) => {
  const session = useSession()
  const isLoggedIn = !!session.data

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
  

  return (
    <>
      <Card
        onClick={handleSignOut}
        sx={{cursor: "pointer"}}
        {...cardProps}
      >
        <CardHeader
          avatar={<BadgeIndicator />}
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




interface SignOutDialogProps {
  open: boolean;
  onClose: () => void;
}

const SignOutDialog = ({ open, onClose }: SignOutDialogProps) => {
  const handleConfirmSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Sign Out</DialogTitle>
      <DialogContent>Are you sure you want to sign out?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirmSignOut}>
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};
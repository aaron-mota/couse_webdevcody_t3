import { Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TypographyProps } from '@mui/material'
import React, { useState } from 'react'
import { BadgeIndicator } from './BadgeIndicator'
import { MoreVert } from '@mui/icons-material'
import { signOut, useSession } from 'next-auth/react'

export const UserCard = () => {
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
      >
        <CardHeader
          avatar={<BadgeIndicator />}
          action={
            <IconButton aria-label="settings" sx={{mt: 0.5}}>
              <MoreVert />
            </IconButton>
          }
          title={session.data?.user.name}
          subheader={session.data?.user.email}
          titleTypographyProps={titleTypographyProps}
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
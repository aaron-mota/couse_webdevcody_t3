import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { signOut } from "next-auth/react";

interface SignOutDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SignOutDialog = ({ open, onClose }: SignOutDialogProps) => {
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
        <Button variant="contained" onClick={() => {handleConfirmSignOut().catch(console.error)}}>
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({user,updatedUser}) {

  /*
   =============================================
   =============================================
       Update Data (start)
    ============================================
    ============================================

  */


    const [userName,setUserName] = useState(user.name)
    const [userEmail,setUserEmail] = useState(user.email)
    const [userRole,setUserRole]  = useState(user.role);
 
 
 
 
 
     /*
    =============================================
    =============================================
        Update Data (end)
     ============================================
     ============================================
 
   */

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    let updatedUserData = {
      id: user.id,
      name: userName,
      email: userEmail,
      role:userRole
    }

    updatedUser(updatedUserData);
    setOpen(false);
  }; 

  

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
          <ModeEditIcon color="primary" />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="edit_form">
            <input type="text" placeholder='Name...' value={userName}  onChange={(event)=>setUserName(event.target.value)}/>
            <input type="email" id="" placeholder='Email...' value={userEmail}  onChange={(event)=>setUserEmail(event.target.value)}/>
            <input type="text" placeholder='Role...' value={userRole} onChange={(event)=>setUserRole(event.target.value)}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

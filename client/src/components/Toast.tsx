import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { clearMessage, selectMessage } from '../slices/messageSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    dispatch(clearMessage());
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={message.type === 'success' ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {message.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

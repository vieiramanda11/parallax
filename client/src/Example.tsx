import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
} from '@mui/material';
import Quote from './components/Quote';
import CreateOrder from './components/CreateOrder';
import Orders from './components/Orders';
import Toast from './components/ErrorToast';
import ErrorToast from './components/ErrorToast';

const App = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleToastClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const displayErrorToast = (errorMessage: React.SetStateAction<string>) => {
    setToastMessage(errorMessage);
    setToastOpen(true);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Grid container spacing={2}>
          <Quote />
          <CreateOrder />

          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Typography variant="h5" gutterBottom>
              Past Orders
            </Typography>
            <Orders />
          </Grid>
        </Grid>
      </Paper>
      <ErrorToast />
    </Container>
  );
};

export default App;

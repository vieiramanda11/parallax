import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import { createOrder } from '../services/requests';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuoteData } from '../slices/quoteSlice';
import { fetchOrders } from '../slices/ordersSlice';
import { AppDispatch } from '../store/rootReducer';
import { setMessage } from '../slices/messageSlice';

const CreateOrder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const quoteData = useSelector(selectQuoteData);

  const [amount, setAmount] = useState(0);

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmount(Number(event.target.value));
  };

  const handleExecute = () => {
    if (quoteData) {
      createOrder(quoteData.id, '1a2b7426-117e-4620-b795-d0fd5872b30f', amount)
        .then(() => {
          dispatch(
            setMessage({
              message:
                'Order created, your list will be updated in a few seconds',
              type: 'success',
            })
          );
        })
        .catch(() => {
          dispatch(
            setMessage({ message: 'Error creating orders', type: 'error' })
          );
        });

      setTimeout(() => {
        dispatch(fetchOrders());
      }, 7000);
    }
    setAmount(0);
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={2} sx={{ padding: 3 }}>
        <Box height={200}>
          <TextField
            value={amount}
            inputProps={{ min: '0' }}
            type="number"
            label="Amount"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            onChange={(event) => handleAmountChange(event)}
          />
          <Button variant="contained" color="primary" onClick={handleExecute}>
            Execute
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default CreateOrder;

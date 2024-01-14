import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { createOrder } from '../services/requests';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuoteData } from '../slices/quoteSlice';
import { fetchOrders } from '../slices/ordersSlice';
import { AppDispatch } from '../store/rootReducer';
import { setError } from '../slices/errorSlice';

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
      createOrder(
        quoteData.id,
        '1a2b7426-117e-4620-b795-d0fd5872b30f',
        amount
      ).catch(() => {
        dispatch(setError('Error creating order'));
      });

      setTimeout(() => {
        dispatch(fetchOrders());
      }, 5000);
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <TextField
        // inputProps={{ min: '0' }}
        type="number"
        label="Amount"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={(event) => handleAmountChange(event)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleExecute}
        fullWidth
      >
        Execute
      </Button>
    </Grid>
  );
};

export default CreateOrder;

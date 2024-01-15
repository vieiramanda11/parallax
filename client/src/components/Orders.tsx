import React, { useEffect } from 'react';
import {
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, selectOrders } from '../slices/ordersSlice';
import { AppDispatch } from '../store/rootReducer';

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders).slice().reverse();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success.main';
      case 'failed':
        return 'error.main';
      case 'pending':
        return 'primary.main';
      default:
        return 'black';
    }
  };

  return (
    <Grid item xs={12} sx={{ marginTop: 2 }}>
      <Typography variant="h5" gutterBottom>
        Past Orders
      </Typography>
      {orders.length === 0 && (
        <Typography variant="body1" gutterBottom>
          No orders
        </Typography>
      )}
      <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
        {orders &&
          orders.map((order: any) => (
            <ListItem
              key={order.id}
              sx={{
                border: '1px solid #000',
                borderRadius: '4px',
                paddingX: '16px',
                paddingY: '8px',
                marginBottom: '8px',
              }}
            >
              <ListItemText
                primary={
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Chip
                        label={`Status: ${order.status}`}
                        variant="outlined"
                        sx={{
                          color: getStatusColor(order.status),
                          marginRight: 1,
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography component="span" variant="body2">
                        {`Order ID: ${order.id}`}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="span" variant="body2">
                        {`Amount: ${order.from_amount}`}
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
            </ListItem>
          ))}
      </List>
    </Grid>
  );
};

export default Orders;

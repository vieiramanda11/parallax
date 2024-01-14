import React, { useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, selectOrders } from '../slices/ordersSlice';
import { AppDispatch } from '../store/rootReducer';

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <List>
      {orders &&
        orders.map((order: any) => (
          <ListItem key={order.id}>
            <ListItemText
              primary={`Order ID: ${order.id}`}
              secondary={`Status: ${order.status}, Amount: ${order.from_amount}`}
            />
          </ListItem>
        ))}
    </List>
  );
};

export default Orders;

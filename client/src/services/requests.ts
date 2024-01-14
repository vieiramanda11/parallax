import api from './api';

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserOrders = async (userId: string) => {
  const response = await api.get(`/users/${userId}/orders`);
  return response.data;
};

export const getOrder = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const createQuote = async () => {
  const response = await api.post('/quotes');
  return response.data;
};

export const createOrder = async (
  quoteId: string,
  userId: string,
  fromAmount: number
) => {
  const body = {
    quote_id: quoteId,
    user_id: userId,
    from_amount: fromAmount,
  };
  const response = await api.post('/orders', body);
  return response.data;
};

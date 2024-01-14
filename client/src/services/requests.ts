import api from './api';

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    if (response.status !== 200) {
      throw new Error(`Error: Received status code ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return null;
  }
};

export const getUserOrders = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}/orders`);
    if (response.status !== 200) {
      throw new Error(`Error: Received status code ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch orders for user ${userId}:`, error);
    return null;
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    if (response.status !== 200) {
      throw new Error(`Error: Received status code ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return null;
  }
};

export const createQuote = async () => {
  try {
    const response = await api.post('/quotes');
    if (response.status !== 201) {
      throw new Error(`Error: Received status code ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Failed to create quote:', error);
    return null;
  }
};

export const createOrder = async (
  quoteId: string,
  userId: string,
  fromAmount: string
) => {
  try {
    const body = {
      quote_id: quoteId,
      user_id: userId,
      from_amount: fromAmount,
    };
    const response = await api.post('/orders', body);
    if (response.status !== 200) {
      throw new Error(`Error: Received status code ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Failed to create order:', error);
    return null;
  }
};

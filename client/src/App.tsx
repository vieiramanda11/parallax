import { Container, Paper, Grid } from '@mui/material';
import Quote from './components/Quote';
import CreateOrder from './components/CreateOrder';
import Orders from './components/Orders';
import Toast from './components/Toast';
import { useSelector } from 'react-redux';
import { selectMessage } from './slices/messageSlice';

const App = () => {
  const message = useSelector(selectMessage);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginY: 3 }}>
        <Grid container spacing={2}>
          <Quote />
          <CreateOrder />
          <Orders />
        </Grid>
      </Paper>
      {message.message !== null && <Toast />}
    </Container>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { utcToZonedTime } from 'date-fns-tz';
import { differenceInSeconds } from 'date-fns';

import { createQuote } from '../services/requests';
import {
  clearQuoteData,
  selectExpirationTime,
  selectQuoteData,
  setQuoteData,
} from '../slices/quoteSlice';
import { setMessage } from '../slices/messageSlice';

const Quote = () => {
  const dispatch = useDispatch();
  const quoteData = useSelector(selectQuoteData);
  const expirationTime = useSelector(selectExpirationTime);

  const calculateRemainingTime = () => {
    if (quoteData && quoteData.created_at) {
      const now = utcToZonedTime(new Date(), 'Etc/UTC');
      const elapsedTime = differenceInSeconds(
        now,
        new Date(quoteData.created_at)
      );
      const remainingTime = 300 - elapsedTime;
      return remainingTime > 0 ? Math.floor(remainingTime) : 0;
    }
    return 300;
  };

  const [timer, setTimer] = useState(calculateRemainingTime);

  const handleQuote = async () => {
    await createQuote()
      .then((response) => {
        dispatch(setQuoteData(response.data));
        setTimer(300);
        dispatch(setMessage({ message: 'Quote created', type: 'success' }));
      })
      .catch((error) => {
        dispatch(
          setMessage({ message: 'Error creating quote', type: 'error' })
        );
      });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const now = Date.now();
    if (expirationTime && now > expirationTime) {
      dispatch(clearQuoteData());
    }
  }, [dispatch, expirationTime]);

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={2} sx={{ padding: 3 }}>
        <Box height={200}>
          <Typography variant="h5" gutterBottom>
            USD ⇒ PHP Currency Exchange
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleQuote}
            sx={{ marginBottom: 2 }}
          >
            Quote
          </Button>
          {quoteData && (
            <>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {`Exchange Rate: ${quoteData.rate}`}
              </Typography>
              <Typography
                color={timer === 0 ? 'error' : ''}
                variant="body2"
                sx={{ marginTop: 1 }}
              >
                {timer === 0
                  ? 'Quote is not valid anymore, make a new one'
                  : `Time remaining: ${Math.floor(timer / 60)}:${
                      timer % 60 < 10 ? '0' : ''
                    }${timer % 60}`}
              </Typography>
            </>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default Quote;

import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
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
import { setError } from '../slices/errorSlice';

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
    const newQuoteData = await createQuote().catch((error) => {
      dispatch(setError('Error creating quote'));
    });
    if (newQuoteData) {
      dispatch(setQuoteData(newQuoteData.data));
      setTimer(300);
    }
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
      <Typography variant="h5" gutterBottom>
        USD ⇒ PHP Currency Exchange
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleQuote}
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        Quote
      </Button>
      {quoteData && (
        <>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {`Exchange Rate: ${quoteData.rate} USD to PHP`}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            {timer === 0
              ? 'Quote is not valid anymore, make a new one'
              : `Time remaining: ${Math.floor(timer / 60)}:${
                  timer % 60 < 10 ? '0' : ''
                }${timer % 60}`}
          </Typography>
        </>
      )}
    </Grid>
  );
};

export default Quote;

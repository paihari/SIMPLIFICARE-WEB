import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

// Function to format numbers in billions
const formatInBillions = (value) => {
  if (!value) return 'N/A';
  return (value / 1e9).toFixed(2) + 'B';  // Convert to billions and format to 2 decimal places
};

const StockTile = ({ title, stock, color, onClick }) => {
  return (
    <Card sx={{ backgroundColor: color, boxShadow: 3, mb: 2, cursor: 'pointer' }} onClick={onClick}>
      <CardContent>
        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
          Symbol: {stock.symbol}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
          Current Price: ${stock.currentprice}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
          Market Cap: {formatInBillions(stock.marketcap)}  {/* Format Market Cap in billions */}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
          Price to Book: {stock.pricetobook}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
          Free Cashflow: {formatInBillions(stock.freecashflow)}  {/* Format Free Cashflow in billions */}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
          EBITDA: {formatInBillions(stock.ebitda)}  {/* Format EBITDA in billions */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StockTile;

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const terminologies = [
  { term: 'ask', description: 'The current price that a seller is willing to accept for a stock.' },
  { term: 'bid', description: 'The current price that a buyer is willing to pay for a stock.' },
  { term: 'open', description: 'The price at which the stock first traded when the market opened on a given day.' },
  { term: 'currentprice', description: 'The most recent price of the stock in the market.' },
  { term: 'previousclose', description: 'The last price at which the stock traded during the previous market session.' },
  { term: 'daylow', description: 'The lowest price the stock has traded at during the current trading day.' },
  { term: 'dayhigh', description: 'The highest price the stock has traded at during the current trading day.' },
  { term: 'targetlowprice', description: 'The lowest estimated price target given by analysts.' },
  { term: 'targethighprice', description: 'The highest estimated price target given by analysts.' },
  { term: 'targetmeanprice', description: 'The average price target given by analysts.' },
  { term: 'regularmarketopen', description: 'The price at which the stock opened in the regular market session.' },
  { term: 'regularmarketdaylow', description: 'The lowest price during the current day\'s regular trading session.' },
  { term: 'regularmarketdayhigh', description: 'The highest price during the current day\'s regular trading session.' },
  { term: 'volume', description: 'The total number of shares traded during the current trading day.' },
  { term: 'averagevolume', description: 'The average number of shares traded per day over a specific time period.' },
  { term: 'bidsize', description: 'The number of shares a buyer is willing to purchase at the bid price.' },
  { term: 'asksize', description: 'The number of shares a seller is offering at the ask price.' },
  { term: 'sharesshort', description: 'The number of shares that have been sold short.' },
  { term: 'sharesshortpriormonth', description: 'The number of short-sold shares in the previous month.' },
  { term: 'shortpercentoffloat', description: 'The percentage of shares shorted compared to the total number of shares available for public trading.' },
  { term: 'shortratio', description: 'The number of days it would take short sellers to cover their positions based on the stock\'s average trading volume.' },
  { term: 'sharesoutstanding', description: 'The total number of shares currently owned by all shareholders.' },
  { term: 'floatshares', description: 'The total number of shares available for public trading (excluding restricted shares).' },
  { term: 'beta', description: 'A measure of the stock\'s volatility in relation to the overall market.' },
  { term: 'ebitda', description: 'Earnings Before Interest, Taxes, Depreciation, and Amortization, a measure of a company\'s operating profitability.' },
  { term: 'ebitdamargins', description: 'EBITDA divided by total revenue, showing the profitability of core operations as a percentage.' },
  { term: 'marketcap', description: 'The total market value of all outstanding shares (calculated as current price multiplied by the total number of shares outstanding).' },
  { term: 'enterprisevalue', description: 'A measure of a company’s total value, calculated as market cap plus total debt minus cash.' },
  { term: 'pricetobook', description: 'The ratio of the stock’s market price to its book value per share.' },
  { term: 'bookvalue', description: 'The net asset value of the company per share, calculated as total assets minus liabilities divided by the number of shares.' },
  { term: 'pegratio', description: 'Price/Earnings to Growth ratio, used to determine the relative value of a stock by considering both the P/E ratio and the company’s expected earnings growth.' },
  { term: 'forwardpe', description: 'The price-to-earnings ratio based on expected future earnings.' },
  { term: 'trailingpe', description: 'The price-to-earnings ratio based on the last 12 months\' earnings.' },
  { term: 'forwardeps', description: 'The expected earnings per share in the future.' },
  { term: 'trailingeps', description: 'The actual earnings per share for the past 12 months.' },
  { term: 'payoutratio', description: 'The proportion of earnings paid out as dividends to shareholders.' },
  { term: 'debttoequity', description: 'A measure of a company’s financial leverage, calculated by dividing total debt by shareholders\' equity.' },
  { term: 'grossmargins', description: 'Gross profit divided by total revenue, showing how much revenue remains after covering direct costs.' },
  { term: 'operatingmargins', description: 'Operating income divided by total revenue, showing the profitability from core operations.' },
  { term: 'profitmargins', description: 'Net income divided by total revenue, indicating how much profit is generated from total sales.' },
  { term: 'revenuepershare', description: 'Total revenue divided by the number of shares outstanding.' },
  { term: 'dividendrate', description: 'The total expected dividend payout per share over the next year.' },
  { term: 'dividendyield', description: 'The ratio of a company\'s annual dividend compared to its stock price, expressed as a percentage.' },
  { term: 'freecashflow', description: 'The amount of cash generated by the company that is available for distribution to shareholders, debt repayment, or reinvestment.' },
  { term: 'auditrisk', description: 'A measure of the risk associated with the company\'s financial auditing.' },
  { term: 'boardrisk', description: 'A measure of risk associated with the company’s board of directors.' },
  { term: 'compensationrisk', description: 'Risk related to the company\'s executive compensation policies.' },
  { term: 'overallrisk', description: 'An overall risk rating, often calculated from factors such as governance, audit, and financial stability.' },
  { term: 'shareholderrightsrisk', description: 'A measure of the risks associated with shareholders\' rights in the company.' },
  { term: 'currency', description: 'The currency in which the stock is traded (e.g., USD).' },
  { term: 'exchange', description: 'The stock exchange where the company is listed (e.g., NYQ = New York Stock Exchange).' },
  { term: 'symbol', description: 'The stock ticker symbol (e.g., VST for Vistra Corp.).' },
  { term: 'sector', description: 'The economic sector in which the company operates (e.g., Utilities).' },
  { term: 'industry', description: 'The industry category (e.g., Independent Power Producers within the Utilities sector).' },
  { term: 'fiftydayaverage', description: 'The average price of the stock over the last 50 trading days.' },
  { term: 'twohundreddayaverage', description: 'The average price of the stock over the last 200 trading days.' },
  { term: 'fiftytwoweekhigh', description: 'The highest price the stock has traded at in the last 52 weeks.' },
  { term: 'fiftytwoweeklow', description: 'The lowest price the stock has traded at in the last 52 weeks.' },
  { term: 'recommendationkey', description: 'Analyst recommendation, such as "buy" or "hold."' },
  { term: 'recommendationmean', description: 'The average recommendation score from analysts (1 = strong buy, 5 = strong sell).' },
];

const Dictionary = () => {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          Dictionary
        </Typography>
  
        <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', backgroundColor: '#f5f5f5', color: '#333' }}>
                  Term
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', backgroundColor: '#f5f5f5', color: '#333' }}>
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {terminologies.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', // Subtle alternating row colors
                    '&:hover': {
                      backgroundColor: '#f1f1f1', // Slightly darker hover effect for each row
                    },
                  }}
                >
                  <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#555' }}>{item.term}</TableCell>
                  <TableCell sx={{ fontFamily: 'Poppins, sans-serif', color: '#555' }}>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default Dictionary;

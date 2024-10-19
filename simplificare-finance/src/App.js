import React, { useState } from 'react';
import { 
  Grid, CircularProgress, Container, Button, MenuItem, Select, InputLabel, 
  FormControl, Typography, Box, Modal, Paper, Drawer, List, ListItem, ListItemText, Divider 
} from '@mui/material';
import StockTile from './components/StockTile';
import Dictionary from './components/Dictionary';  // Import Dictionary component

import { runJob, getJobResult } from './api';
import FilterBar from './components/FilterBar';

// Define utility functions and variables here

// Function to format numbers in billions
const formatInBillions = (value) => {
  if (!value) return 'N/A';
  return (value / 1e9).toFixed(2) + 'B';  // Convert to billions and format to 2 decimal places
};

// Utility function to format dictionary key names
const formatTitle = (key) => {
  return key
    .replace(/_/g, ' ')
    .replace(/dict/g, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// List of soothing colors for the tiles
const tileColors = ['#e3f2fd', '#ffecb3', '#c8e6c9', '#ffe0b2', '#f0f4c3'];

const App = () => {
  const [loading, setLoading] = useState(false);
  const [jobResult, setJobResult] = useState(null);
  const [selectedDict, setSelectedDict] = useState('All');
  const [selectedStock, setSelectedStock] = useState(null);  // Track selected stock for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);  // Track drawer (sidebar) state
  const [activePage, setActivePage] = useState('stocks');  // Track the active page ('stocks' or 'dictionary')

  const handleRunJob = async () => {
    setLoading(true);
    try {
      const uuid = await runJob();
      console.log('Job UUID:', uuid);
      const result = await getJobResult(uuid);
      setJobResult(result);
      setSelectedDict('All');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (result) => {
    if (selectedDict === 'All') {
      return Object.keys(result).map((dictKey) => ({
        key: dictKey,
        stock: result[dictKey],
      }));
    }
    const stock = result[selectedDict];
    return stock ? [{ key: selectedDict, stock }] : [];
  };

  // Handle click on stock tile to open modal
  const handleTileClick = (stock) => {
    setSelectedStock(stock);
    setModalOpen(true);  // Open modal with detailed info
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStock(null);
  };

  // Handle toggle for the left drawer (sidebar)
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Sidebar content for the left drawer
  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => setActivePage('stocks')}>
          <ListItemText primary="Stocks" />
        </ListItem>
        <ListItem button onClick={() => setActivePage('dictionary')}>
          <ListItemText primary="Dictionary" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Container>
      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>

      {/* Site Heading with Run Job Button next to it */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Button variant="outlined" onClick={toggleDrawer(true)}>
          Menu
        </Button>
        <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
          Simplificare Finance
        </Typography>
        <Button variant="contained" color="primary" onClick={handleRunJob} disabled={loading}>
          {loading ? 'Job in Progress...' : 'Run Job'}
        </Button>
      </Box>

      {loading && (
        <Container>
          <CircularProgress />
        </Container>
      )}

      {/* Conditionally render the Stocks or Dictionary page based on activePage */}
      {activePage === 'stocks' && (
        <>
          {jobResult && <FilterBar />}

          {jobResult && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Dictionary Type</InputLabel>
              <Select
                value={selectedDict}
                onChange={(e) => setSelectedDict(e.target.value)}
                label="Select Dictionary Type"
              >
                <MenuItem value="All">All</MenuItem>
                {Object.keys(jobResult).map((key) => (
                  <MenuItem key={key} value={key}>
                    {formatTitle(key)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Display StockTiles */}
          {jobResult && (
            <Grid container spacing={3}>
              {applyFilters(jobResult).map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <StockTile
                    title={formatTitle(item.key)}
                    stock={item.stock}
                    color={tileColors[idx % tileColors.length]}
                    onClick={() => handleTileClick(item.stock)}  // Open modal on click
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Conditionally render Dictionary page when activePage is 'dictionary' */}
      {activePage === 'dictionary' && <Dictionary />}

      {/* Modal for detailed view */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Paper sx={{ padding: 3, margin: 'auto', maxWidth: 500, marginTop: '10%' }}>
          {selectedStock && (
            <>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                {selectedStock.symbol} - Detailed Information
              </Typography>
              <Typography variant="body1">Current Price: ${selectedStock.currentprice}</Typography>
              <Typography variant="body1">Market Cap: {formatInBillions(selectedStock.marketcap)}</Typography>  {/* Format Market Cap */}
              <Typography variant="body1">Price to Book: {selectedStock.pricetobook}</Typography>
              <Typography variant="body1">Earnings Growth: {selectedStock.earningsgrowth}</Typography>
              <Typography variant="body1">Revenue Growth: {selectedStock.revenuegrowth}</Typography>
              <Typography variant="body1">EBITDA: {formatInBillions(selectedStock.ebitda)}</Typography>  {/* Format EBITDA */}
              <Typography variant="body1">Dividend Yield: {selectedStock.dividendyield}</Typography>
              <Typography variant="body1">Return on Assets (ROA): {selectedStock.returnonassets}</Typography>
              <Typography variant="body1">Return on Equity (ROE): {selectedStock.returnonequity}</Typography>
              <Typography variant="body1">Free Cashflow: {formatInBillions(selectedStock.freecashflow)}</Typography>  {/* Format Free Cashflow */}
            </>
          )}
        </Paper>
      </Modal>
    </Container>
  );
};

export default App;

import { createTheme } from '@mui/material/styles';

// Custom MUI Theme with soothing colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#a5d6a7',  // Soothing green for primary actions
    },
    secondary: {
      main: '#81d4fa',  // Light blue for secondary actions
    },
    background: {
      default: '#f0f4f8',  // Light background color for the app
    },
    text: {
      primary: '#37474f',  // Dark grey for text
      secondary: '#607d8b',  // Muted grey for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    body1: {
      fontSize: '1rem',
      color: '#37474f',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#607d8b',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#37474f',
    },
  },
});

export default theme;

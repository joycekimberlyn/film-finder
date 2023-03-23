import { extendTheme } from '@chakra-ui/react';

const theme = {
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(315deg, #485461 0%, #28313b 74%) no-repeat fixed',
      },
      p: {
        color: '#ffffff',
      },
      h1: {
        color: '#ffffff',
      },
      h2: {
        color: '#ffffff',
      },
    },
  },
};

export default extendTheme(theme);

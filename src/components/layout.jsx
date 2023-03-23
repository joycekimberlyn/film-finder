import React from 'react';
import { Container, Box } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <Box paddingY={{ base: '20px', md: '30px', xl: '50px' }}>
      <Container maxWidth={'1440px'}>{children}</Container>
    </Box>
  );
}

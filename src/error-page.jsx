import { Link } from 'react-router-dom';
import { Text, Button, Center } from '@chakra-ui/react';
import Layout from './components/layout';

export default function ErrorPage() {
  return (
    <Layout>
      <Center flexDirection={'column'} gap={'20px'} minHeight={'90vh'}>
        <Text fontSize={{ base: '24px', md: '34px' }} fontWeight={500}>
          Oops! Page Not Found
        </Text>
        <Button
          as={Link}
          to={'/'}
          width={'180px'}
          height={'55px'}
          fontSize={'20px'}
          color={'#fff'}
          backgroundColor={'#485461'}
          borderRadius={'35px'}
          sx={{
            _active: {
              backgroundColor: '#485461',
            },
            _hover: {
              backgroundColor: '#485461',
            },
          }}
        >
          Back to Home
        </Button>
      </Center>
    </Layout>
  );
}

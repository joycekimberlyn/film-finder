import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flex, Button, Text, Container } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export default function Pagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({ page: 1 });

  useEffect(() => {
    if (searchParams.has('page')) {
      setQueryParams(Object.fromEntries(searchParams));
    }
  }, [searchParams]);

  const handlePage = offset => {
    if (
      +queryParams.page + offset < 1 ||
      +queryParams.page + offset > totalPages
    ) {
      return;
    }

    const urlParams = new URLSearchParams({
      ...queryParams,
      page: +queryParams.page + offset,
    });
    setSearchParams(urlParams);
  };

  return (
    <Container maxWidth={'280px'}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        paddingY={'50px'}
      >
        <Button
          isDisabled={queryParams.page === 1}
          padding={'0'}
          backgroundColor={'#485461'}
          border={'1px solid #28313B'}
          borderRadius={'100%'}
          sx={{
            _active: {
              backgroundColor: '#485461',
            },
            _hover: {
              backgroundColor: '#485461',
            },
          }}
          onClick={() => {
            handlePage(-1);
          }}
        >
          <ChevronLeftIcon width={'30px'} height={'auto'} color={'#fff'} />
        </Button>
        <Text fontSize={{ base: '16px', md: '18px' }}>
          {queryParams.page || 1}
        </Text>
        <Button
          isDisabled={queryParams.page === totalPages}
          padding={'0'}
          backgroundColor={'#485461'}
          border={'1px solid #28313B'}
          borderRadius={'100%'}
          sx={{
            _active: {
              backgroundColor: '#485461',
            },
            _hover: {
              backgroundColor: '#485461',
            },
          }}
          onClick={() => {
            handlePage(+1);
          }}
        >
          <ChevronRightIcon width={'30px'} height={'auto'} color={'#fff'} />
        </Button>
      </Flex>
    </Container>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Flex, Input, useMediaQuery } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

export default function SearchInput() {
  const [searchParams] = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const ref = useRef();

  const [isMobile] = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const query = searchParams.get('q');

    if (!query) {
      return;
    }

    setIsSearchOpen(true);
    setSearchValue(query);
  }, [searchParams]);

  useEffect(() => {
    if (isSearchOpen) {
      ref.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchInput = event => {
    setSearchValue(event.target.value);
  };

  const handleEnter = () => {
    if (!searchValue) {
      return;
    }

    navigate(`/search?q=${searchValue}&page=1`);
  };

  return (
    <>
      <Box
        display={!isSearchOpen && !isMobile ? 'block' : 'none'}
        cursor={'pointer'}
        onClick={() => setIsSearchOpen(true)}
      >
        <SearchIcon width={'20px'} height={'auto'} color={'#fff'} />
      </Box>
      <Flex
        alignItems={'center'}
        gap={'10px'}
        display={isSearchOpen || isMobile ? 'flex' : 'none'}
        width={isMobile ? '100%' : '320px'}
      >
        <Box
          width={isMobile ? '100%' : '320px'}
          height={'50px'}
          position={'relative'}
        >
          <SearchIcon
            position={'absolute'}
            top={'15px'}
            left={'15px'}
            zIndex={'1'}
            width={'18px'}
            height={'auto'}
            color={'#485461'}
          />
          <Input
            value={searchValue}
            ref={ref}
            placeholder={'Search movies'}
            onChange={handleSearchInput}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleEnter();
              }
            }}
            width={'100%'}
            height={'100%'}
            paddingLeft={'40px'}
            fontSize={{ base: '16px', md: '18px' }}
            backgroundColor={'#fff'}
            borderColor={'#fff'}
            borderRadius={'25px'}
            sx={{
              _focusVisible: {
                zIndex: '0',
              },
              _placeholder: {
                fontSize: { base: '16px', md: '18px' },
              },
            }}
          />
          <CloseIcon
            position={'absolute'}
            top={'15px'}
            right={'15px'}
            width={'15px'}
            color={'#485461'}
            cursor={'pointer'}
            onClick={() => setSearchValue('')}
          />
        </Box>
      </Flex>
    </>
  );
}

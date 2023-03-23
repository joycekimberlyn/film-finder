import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Flex, Image, Box, Text, Show } from '@chakra-ui/react';
import { TimeIcon, ArrowBackIcon } from '@chakra-ui/icons';

// constants
import { IMAGE_URL } from '../constants/movies-link';

// components
import SearchInput from '../components/searchInput';

export default function MovieDetails() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=2244bbd8f89a9ac9f14898b2bcde5825`
      )
      .then(response => {
        setMovie(response.data);
        console.log('ASDFASDF', response.data);
      });
  }, [id]);

  const date = new Date(movie?.release_date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <Grid
        gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        <Show below={'md'}>
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent={'space-between'}
            alignItems={{ base: 'start', md: 'center' }}
            gap={{ base: '15px', md: '0' }}
            paddingY={'20px'}
            paddingX={'15px'}
          >
            <Flex
              alignItems={'center'}
              gap={'10px'}
              cursor={'pointer'}
              onClick={() => navigate('/')}
            >
              <ArrowBackIcon width={'24px'} height={'auto'} color={'#fff'} />
              <Text fontSize={{ base: '16px', md: '18px' }}>Back to Home</Text>
            </Flex>
            <SearchInput />
          </Flex>
        </Show>
        <Box>
          <Image
            src={`${IMAGE_URL}/${movie?.poster_path}`}
            alt={`${movie?.title} Poster`}
            width={'100%'}
            height={{ base: '50vh', md: '100vh' }}
            objectFit={'cover'}
          />
        </Box>

        <Flex
          flexDirection={'column'}
          gap={'30px'}
          padding={{ base: '20px', md: '30px', xl: '40px' }}
          height={{ base: '100%', md: '100vh' }}
          overflowY={'auto'}
        >
          <Show above={'md'}>
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              height={'50px'}
            >
              <Flex
                alignItems={'center'}
                gap={'10px'}
                cursor={'pointer'}
                onClick={() => navigate('/')}
              >
                <ArrowBackIcon width={'24px'} height={'auto'} color={'#fff'} />
                <Text fontSize={{ base: '16px', md: '18px' }}>
                  Back to Home
                </Text>
              </Flex>
              <SearchInput />
            </Flex>
          </Show>

          <Box>
            <Text
              fontSize={{ base: '16px', md: '20px', xl: '24px' }}
              fontWeight={500}
            >
              {formattedDate}
            </Text>
            <Text
              fontSize={{ base: '28px', md: '36px', xl: '42px' }}
              fontWeight={500}
              margin={'0'}
            >
              {movie?.title}
            </Text>

            <Flex alignItems={'center'} gap={'10px'} paddingTop={'10px'}>
              {movie?.genres.map((genre, index) => {
                return (
                  <Box
                    key={index}
                    paddingY={'5px'}
                    paddingX={'15px'}
                    fontSize={{ base: '14px', md: '16px' }}
                    backgroundColor={'#485461'}
                    borderRadius={'50px'}
                  >
                    <Text>{genre.name}</Text>
                  </Box>
                );
              })}
            </Flex>
          </Box>

          <Box>
            <Text
              fontSize={{ base: '20px', md: '24px', xl: '28px' }}
              fontWeight={500}
            >
              Overview
            </Text>
            <Text fontSize={{ base: '18px', md: '20px', xl: '24px' }}>
              {movie?.overview}
            </Text>
          </Box>

          <Flex flexDirection={'column'} gap={'15px'}>
            <Box
              width={'fit-content'}
              paddingY={'5px'}
              paddingX={'15px'}
              backgroundColor={'#485461'}
              borderRadius={'35px'}
            >
              <Text fontSize={{ base: '14px', md: '16px', xl: '18px' }}>
                {movie?.status}
              </Text>
            </Box>
            <Flex alignItems={'center'} gap={'10px'} paddingLeft={'5px'}>
              <TimeIcon width={'24px'} height={'auto'} color={'#fff'} />
              <Text
                fontSize={{ base: '14px', md: '16px', xl: '18px' }}
                fontWeight={500}
              >
                {movie?.runtime} mins
              </Text>
            </Flex>
            <Flex alignItems={'center'} gap={'10px'}>
              <Box
                paddingY={'5px'}
                paddingX={'15px'}
                backgroundColor={'#485461'}
                borderRadius={'25px'}
              >
                <Text
                  fontSize={{ base: '14px', md: '16px', xl: '18px' }}
                  fontWeight={500}
                >
                  {movie?.vote_average}
                </Text>
              </Box>
              <Text
                fontSize={{ base: '14px', md: '16px', xl: '18px' }}
                fontWeight={500}
              >
                {movie?.vote_count} votes
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Grid>
    </>
  );
}

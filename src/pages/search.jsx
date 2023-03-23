import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Text, Grid, Flex } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

// components
import Layout from '../components/layout';
import SearchInput from '../components/searchInput';
import Pagination from '../components/pagination';
import MovieCard from '../components/movieCard';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [movieList, setMovieList] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const query = searchParams.get('q');
    const page = searchParams.get('page');
    setQuery(query);
    setPage(page);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&api_key=2244bbd8f89a9ac9f14898b2bcde5825`
      )
      .then(response => {
        setMovieList(response.data);

        setTotalPages(response.data.total_pages);

        console.log(response.data);
      });
  }, [searchParams, page]);

  return (
    <Layout>
      <Flex alignItems={'center'} gap={'10px'} cursor={'pointer'} onClick={() => navigate('/')}>
        <ArrowBackIcon width={'24px'} height={'auto'} color={'#fff'} />
        <Text fontSize={{ base: '16px', md: '18px' }}>Back to Home</Text>
      </Flex>
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent={'space-between'}
        alignItems={{ base: 'start', md: 'center' }}
        gap={{ base: '15px', md: '0' }}
        paddingTop={'15px'}
      >
        <Text fontSize={{ base: '20px', md: '24px', xl: '32px' }} margin={'0'}>
          Search results for "{query}"
        </Text>

        <SearchInput />
      </Flex>
      <Grid
        gridTemplateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        gridGap={{ base: '20px', lg: '50px' }}
        paddingTop={{ base: '25px', md: '35px', xl: '50px' }}
      >
        {movieList?.results.map(
          ({ id, title, poster_path, release_date }, index) => {
            return (
              <MovieCard
                id={id}
                index={index}
                title={title}
                posterPath={poster_path}
                releaseDate={release_date}
              />
            );
          }
        )}
      </Grid>
      <Pagination totalPages={totalPages} />
    </Layout>
  );
}

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Heading, Grid, Flex } from '@chakra-ui/react';

// constants
import { API_URL } from '../constants/movies-link';

// components
import SearchInput from '../components/searchInput';
import Layout from '../components/layout';
import MovieCard from '../components/movieCard';
import Pagination from '../components/pagination';

export default function Homepage() {
  const [movieList, setMovieList] = useState(null);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const pageParam = searchParams.get('page');

    if (pageParam) {
      setPage(pageParam);
    }

    axios
      .get(
        `${API_URL}/movie/popular?page=${page}&api_key=2244bbd8f89a9ac9f14898b2bcde5825`
      )
      .then(response => {
        setMovieList(response.data);
        setTotalPages(response.data.total_pages);
        console.log(response.data);
      });
  }, [page, searchParams]);

  return (
    <Layout>
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent={'space-between'}
        alignItems={{ base: 'start', md: 'center' }}
        gap={{ base: '15px', md: '0' }}
      >
        <Heading
          as={'h1'}
          fontSize={{ base: '28px', md: '36px', xl: '42px' }}
          margin={'0'}
        >
          Popular Movies
        </Heading>

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

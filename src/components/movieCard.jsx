import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Text } from '@chakra-ui/react';

// constants
import { IMAGE_URL } from '../constants/movies-link';

export default function MovieCard({
  id,
  index,
  posterPath,
  title,
  releaseDate,
}) {
  const date = new Date(releaseDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <Link to={`/movie/${id}`} key={index}>
      <Image
        src={`${IMAGE_URL}/${posterPath}`}
        alt={`${title} Poster`}
        width={'100%'}
        height={'auto'}
      />
      <Text
        paddingTop={'10px'}
        fontSize={{ base: '14px', lg: '16px', xl: '20px' }}
      >
        {title}
      </Text>
      <Text
        paddingTop={'5px'}
        fontSize={{ base: '12px', lg: '14px', xl: '16px' }}
      >
        {formattedDate}
      </Text>
    </Link>
  );
}

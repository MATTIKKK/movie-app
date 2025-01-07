import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { detailStore } from 'src/store/detailStore';
import { MovieDetails } from 'src/components/movie-details/MovieDetails';

export const MovieDetailsPage = observer(() => {
  const { imdbID } = useParams();

  useEffect(() => {
    if (imdbID) {
      detailStore.fetchMovieDetail(imdbID);
    }
    return () => {
      detailStore.clearMovieDetail();
    };
  }, [imdbID]);

  if (!detailStore.movie) {
    return <Typography>Загрузка...</Typography>;
  }

  return (
    <Container>
      <MovieDetails movie={detailStore.movie} />
    </Container>
  );
});

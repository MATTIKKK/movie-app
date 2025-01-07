import React from 'react';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import { IMovieShort } from 'src/store/movieStore';
import { MovieCard } from '../movie-card/MovieCard';

interface MovieListProps {
  movies: IMovieShort[];
}

export const MovieList: React.FC<MovieListProps> = observer(({ movies }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {movies.map((movie) => (
        <Grid item key={movie.imdbID}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
});

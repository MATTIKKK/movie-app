import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SearchBar } from 'src/components/search-bar/SearchBar';
import { MovieList } from 'src/components/movie-list/MovieList';
import { movieStore } from 'src/store/movieStore';
import { Box } from '@mui/material';

export const HomePage = observer(() => {
  useEffect(() => {
    if (movieStore.movies.length === 0 && !movieStore.isLoading) {
      movieStore.fetchRandomMovies();
    }
  }, []);

  return (
    <Container>
      <SearchBar />
      <MovieList movies={movieStore.movies} />

      {movieStore.errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          Фильм не найден!
        </Typography>
      )}

      {movieStore.movies.length > 0 && !movieStore.errorMessage && (
        <Box sx={{ my: 4 }}>
          <Button
            variant="contained"
            disabled={movieStore.isLoading}
            onClick={() => movieStore.loadMoreMovies()}
          >
            {movieStore.isLoading ? 'Загрузка...' : 'Загрузить ещё'}
          </Button>
        </Box>
      )}
    </Container>
  );
});

import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { favoriteStore } from 'src/store/favoriteStore';

export const FavoritesPage = observer(() => {
  const { favorites, removeFromFavorites } = favoriteStore;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Избранные фильмы
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          У вас нет избранных фильмов.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.imdbID}>
              <Card>
                <CardMedia
                  component="img"
                  image={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.jpg'}
                  alt={movie.Title}
                  height="400"
                />
                <CardContent>
                  <Typography variant="h6">{movie.Title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {movie.Year}
                  </Typography>
                  {/* <Button
                    variant="outlined"
                    onClick={() => removeFromFavorites(movie.imdbID)}
                  >
                    Удалить
                  </Button> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
});

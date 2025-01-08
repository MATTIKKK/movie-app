import React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { favoriteStore } from 'src/store/favoriteStore';
import { useNavigate } from 'react-router-dom';

interface MovieDetailsProps {
  movie: {
    Title: string;
    Year: string;
    Genre: string;
    Director: string;
    Plot: string;
    Poster: string;
    imdbID: string;
    imdbRating: string;
  };
}

export const MovieDetails: React.FC<MovieDetailsProps> = observer(
  ({ movie }) => {
    const navigate = useNavigate();
    const isFavorite = favoriteStore.favorites.some(
      (fav) => fav.imdbID === movie.imdbID
    );

    const handleAddToFavorites = () => {
      if (!isFavorite) {
        favoriteStore.addToFavorites({
          Title: movie.Title,
          Year: movie.Year,
          imdbID: movie.imdbID,
          Poster: movie.Poster,
        });

        navigate('/favorites');
      }
    };

    const youTubeSearchUrl = `https://www.youtube.com/embed/${movie.imdbID}`;

    return (
      <Box sx={{ mt: 2 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 300, mb: 2 }}
            image={movie.Poster !== 'N/A' ? movie.Poster : ''}
            alt={movie.Title}
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {movie.Title} ({movie.Year})
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Жанр:</strong> {movie.Genre}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Режиссер:</strong> {movie.Director}
            </Typography>
            <Typography variant="body2" paragraph>
              {movie.Plot}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Рейтинг IMDb:</strong> {movie.imdbRating}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAddToFavorites}
              disabled={isFavorite}
            >
              {isFavorite ? 'Добавлено в избранное' : 'Добавить в избранное'}
            </Button>
          </CardContent>
        </Card>

        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Трейлер фильма
          </Typography>
          <Box
            sx={{
              position: 'relative',
              paddingTop: '56.25%',
              width: '100%',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <iframe
              src={youTubeSearchUrl}
              title="YouTube Search Results"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              allowFullScreen
            />
          </Box>
        </Box>
      </Box>
    );
  }
);

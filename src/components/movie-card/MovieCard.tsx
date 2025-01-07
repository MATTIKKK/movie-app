import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IMovieShort } from 'src/store/movieStore';

interface MovieCardProps {
  movie: IMovieShort;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: 250, 
          height: 400, 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: 300,
            objectFit: 'cover', 
          }}
          image={movie.Poster !== 'N/A' ? movie.Poster : ''}
          alt={movie.Title}
        />
        <CardContent>
          <Typography variant="h6" noWrap>
            {movie.Title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {movie.Year}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

import React from 'react';
import { observer } from 'mobx-react-lite';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import { movieStore } from 'src/store/movieStore';
import { Box } from '@mui/material';

export const SearchBar = observer(() => {
  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    movieStore.setSearchQuery(e.target.value);
  }, 500);

  return (
    <Box sx={{ my: 4 }}>
      <TextField
        label="Поиск фильмов"
        variant="outlined"
        fullWidth
        onChange={handleChange}
        placeholder="Введите название фильма..."
      />
    </Box>
  );
});

import { makeAutoObservable } from 'mobx';

export interface IFavoriteMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

class FavoriteStore {
  favorites: IFavoriteMovie[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToFavorites(movie: IFavoriteMovie) {
    const exists = this.favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (!exists) {
      this.favorites.push(movie);
      this.saveFavorites();
    }
  }

  removeFromFavorites(imdbID: string) {
    this.favorites = this.favorites.filter((fav) => fav.imdbID !== imdbID);
    this.saveFavorites();
  }

  private saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  private loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }
}

export const favoriteStore = new FavoriteStore();

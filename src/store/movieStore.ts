import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

const API_KEY = '7e59b8de';
const BASE_URL = 'https://www.omdbapi.com/';


export interface IMovieShort {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

class MovieStore {
  movies: IMovieShort[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  fetchRandomMovies() {
    const randomQuery = "abc"; // Use one random letter
    this.setSearchQuery(randomQuery);
  }

  setSearchQuery(query: string) {
    if (query.length < 3) {
      runInAction(() => {
        this.movies = [];
        this.errorMessage = 'Минимум 3 символа';
      });
      return;
    }

    runInAction(() => {
      this.searchQuery = query;
      this.currentPage = 1;
      this.movies = [];
      this.errorMessage = '';
    });

    this.loadMoreMovies();
  }

  async loadMoreMovies() {
    if (this.isLoading) return;

    runInAction(() => {
      this.isLoading = true;
      this.errorMessage = '';
    });

    try {
      let query = this.searchQuery.trim();
      if (!query) {
        return;
      }

      const response = await axios.get(
        `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${this.currentPage}`
      );

      console.log("movies", response.data);

      if (response.data.Response === 'True') {
        runInAction(() => {
          const newMovies: IMovieShort[] = response.data.Search;
          this.movies = [...this.movies, ...newMovies];
          this.currentPage++;
        });
      } else {
        runInAction(() => {
          this.errorMessage = 'Фильм не найден';
        });
      }
    } catch (error: any) {
      console.error('Ошибка при загрузке фильмов:', error);
      runInAction(() => {
        this.errorMessage = 'Ошибка сети или запроса';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const movieStore = new MovieStore();

import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

const API_KEY = "7e59b8de";
const BASE_URL = "https://www.omdbapi.com/";

interface IMovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
  [key: string]: any; // На случай, если придут новые поля
}

class DetailStore {
  movie: IMovieDetail | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMovieDetail(imdbID: string) {
    try {
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
      console.log("movieDetail", response.data);

      runInAction(() => {
        this.movie = response.data;
      });
      
    } catch (error) {
      console.error("Ошибка при загрузке подробной информации о фильме:", error);
      runInAction(() => {
        this.movie = null;
      });
    }
  }

  clearMovieDetail() {
    this.movie = null;
  }
}

export const detailStore = new DetailStore();

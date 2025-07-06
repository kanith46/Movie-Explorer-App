export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  }
  
  export interface MovieDetails extends Movie {
    overview: string;
    release_date: string;
    genres: { id: number; name: string }[];
  }
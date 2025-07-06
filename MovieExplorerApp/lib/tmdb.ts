import { Movie, MovieDetails } from './types';

export async function fetchMovies(page: number, query?: string): Promise<Movie[]> {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    : `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
  
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch movies');
  const data = await res.json();
  return data.results;
}

export async function fetchMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return await res.json();
}
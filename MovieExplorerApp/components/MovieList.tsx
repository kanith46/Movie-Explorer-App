import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../lib/types';
import { fetchMovies } from '../lib/tmdb';
import LoadingSkeleton from './LoadingSkeleton';

interface MovieListProps {
  initialMovies: Movie[];
  searchQuery?: string;
}

export default function MovieList({ initialMovies, searchQuery }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
        !isLoading
      ) {
        setIsLoading(true);
        fetchMovies(page + 1, searchQuery).then((newMovies) => {
          setMovies((prev) => [...prev, ...newMovies]);
          setPage(page + 1);
          setIsLoading(false);
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, isLoading, searchQuery]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      {isLoading && <LoadingSkeleton />}
    </div>
  );
}
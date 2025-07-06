import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../lib/types';
import FavoriteButton from './FavoriteButton';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative h-96">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold dark:text-white">{movie.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Rating: {movie.vote_average.toFixed(1)}
          </p>
          <FavoriteButton movie={movie} />
        </div>
      </Link>
    </div>
  );
}
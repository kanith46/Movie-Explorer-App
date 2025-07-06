import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import { fetchMovieDetails } from '../lib/tmdb';
import { MovieDetails } from '../lib/types';

interface MovieDetailProps {
  movie: MovieDetails;
}

export default function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/3 h-96">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold dark:text-white">{movie.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{movie.overview}</p>
          <p className="mt-2 dark:text-white">
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
          </p>
          <p className="mt-2 dark:text-white">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="mt-2 dark:text-white">
            <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const movie = await fetchMovieDetails(context.params?.id as string);
  return { props: { movie } };
};
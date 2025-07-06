import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import MovieList from '../components/MovieList';
import { Movie } from '../lib/types';

export default function Favorites({ initialMovies }: { initialMovies: Movie[] }) {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold dark:text-white my-6 text-center">My Favorites</h1>
      {initialMovies.length === 0 ? (
        <p className="text-center dark:text-white">No favorite movies yet.</p>
      ) : (
        <MovieList initialMovies={initialMovies} />
      )}
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

  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return { props: { initialMovies: favorites } };
};
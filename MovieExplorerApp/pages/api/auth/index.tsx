import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import { fetchMovies } from '../lib/tmdb';
import { Movie } from '../lib/types';

interface HomeProps {
  initialMovies: Movie[];
  searchQuery?: string;
}

export default function Home({ initialMovies, searchQuery }: HomeProps) {
  return (
    <div>
      <SearchBar />
      <MovieList initialMovies={initialMovies} searchQuery={searchQuery} />
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

  const searchQuery = context.query.search as string | undefined;
  const movies = await fetchMovies(1, searchQuery);
  return {
    props: { initialMovies: movies, searchQuery: searchQuery || null },
  };
};
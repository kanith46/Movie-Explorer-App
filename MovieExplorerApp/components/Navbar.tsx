import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold dark:text-white">
          Movie Explorer
        </Link>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link href="/favorites" className="dark:text-white hover:text-blue-500">
                My Favorites
              </Link>
              <button
                onClick={() => signOut()}
                className="dark:text-white hover:text-blue-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="dark:text-white hover:text-blue-500">
                Login
              </Link>
              <Link href="/register" className="dark:text-white hover:text-blue-500">
                Register
              </Link>
            </>
          )}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="dark:text-white"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}
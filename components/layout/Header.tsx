import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../lib/initFirebase";
import LoginButton from "../button/LoginButton";
import LogoutButton from "../button/LogoutButton";

const Header = () => {
  const [user] = useAuthState(auth);

  const userPhotoUrl = user?.photoURL;

  return (
    <header className="container flex items-center justify-between mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="text-center sm:text-left hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
      >
        <h1 className="text-4xl font-medium">Sample App</h1>
      </Link>
      <nav className="flex items-center justify-between">
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          {user && (
            <img
              src={userPhotoUrl || undefined}
              alt="User photo"
              width={24}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          {user ? <LogoutButton /> : <LoginButton />}
          {user && (
            <Link
              href="/posts/new"
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              Create Post
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

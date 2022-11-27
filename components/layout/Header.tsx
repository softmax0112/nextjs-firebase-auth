import Link from "next/link";
import { useEffect } from "react";
import Router from "next/router";

import LoginButton from "../atoms/button/LoginButton";
import LogoutButton from "../atoms/button/LogoutButton";
import { useAuthContext } from "context/AuthContext";

const Header = () => {
  const { currentUser, loading, logout } = useAuthContext();

  const userPhotoUrl = currentUser?.photoURL;

  useEffect(() => {
    if (!loading && !currentUser) {
      Router.push("/");
    }
  }, [currentUser, loading]);

  const logoutHandler = async () => {
    await logout();
    alert("You are signed out");
  };

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
          {currentUser && (
            <img
              src={userPhotoUrl || undefined}
              alt="User photo"
              referrerPolicy="no-referrer"
              width={24}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          {currentUser && (
            <Link
              href="/posts/new"
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              Create Post
            </Link>
          )}
          {currentUser ? (
            <LogoutButton onLogout={logoutHandler} />
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

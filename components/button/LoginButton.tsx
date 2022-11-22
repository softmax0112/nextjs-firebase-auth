import Link from "next/link";

const LoginButton = () => {
  return (
    <Link
      href="/login"
      className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
      type="button"
    >
      <span className="text-sm font-medium"> Login </span>
    </Link>
  );
};

export default LoginButton;

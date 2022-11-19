import GoogleLogo from "./GoogleLog";

const SignIn = (): JSX.Element => {
  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-3xl font-medium">Sign in</h1>
      <p className="text-slate-500">Hi, Welcome 👋</p>

      <div className="my-5">
        <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
          <GoogleLogo />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignIn;

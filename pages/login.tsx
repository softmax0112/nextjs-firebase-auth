import axios from "axios";
import { useRouter } from "next/router";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { auth } from "../lib/initFirebase";
import GoogleLogo from "../components/GoogleLog";

const LoginPage = () => {
  const router = useRouter();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error happened: {error.message}</p>
      </div>
    );
  }

  if (user) {
    router.push("/");
  }

  const handleGoogleLogin = () => {
    const verifyIdToken = async () => {
      await signInWithGoogle();
      const token = await user?.user.getIdToken(true);
      console.log("Calling API with user token:", token);

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get("/login", config);
        console.log(response.data);
        if (response.status === 200) {
          router.push("/");
          alert("Welcme back");
        }
      } catch (err) {
        let message;
        if (axios.isAxiosError(err) && err.response) {
          console.error(err.response.data.message);
        } else {
          message = String(err);
          console.error(message);
        }
      }
    };
    verifyIdToken();
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 mt-40 rounded-xl shadow shadow-slate-300">
      <h1 className="text-3xl font-medium">Sign in</h1>
      <p className="text-slate-500">Hi, Welcome 👋</p>

      <div className="my-5">
        <button
          onClick={handleGoogleLogin}
          className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <GoogleLogo />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

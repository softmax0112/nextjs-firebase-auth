import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { auth } from "../lib/initFirebase";
import GoogleLogo from "../components/GoogleLog";
import { AuthContext } from "../context/AuthContext";

interface SuccessResponse {
  mesg: string;
}

interface ErrorResponse {
  error: string;
}

const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (user) {
    router.push("/");
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  const handleGoogleLogin = () => {
    const verifyIdToken = async () => {
      await loginWithGoogle();
      const token = await auth.currentUser?.getIdToken(true);
      console.log("Calling API with user token:", token);

      const endpoint = "http://localhost:3001/api/v1/users/create";
      const requestInfo = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get<SuccessResponse>(
          endpoint,
          requestInfo
        );
        console.log(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          console.log((err.response?.data as ErrorResponse).error);
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

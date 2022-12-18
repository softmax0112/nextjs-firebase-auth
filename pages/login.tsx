import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import GoogleLogo from "components/atoms/GoogleLogo";
import { useAuthContext } from "context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithGoogle } = useAuthContext();

  const handleGoogleLogin = () => {
    const verifyIdToken = async () => {
      const user = await loginWithGoogle();
      const token = await user?.getIdToken();

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.post("/auth", null, config);
        toast.success("You are signed in successfully!");
        router.push("/");
      } catch (err) {
        toast.error("Something wrong happened!");
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
}

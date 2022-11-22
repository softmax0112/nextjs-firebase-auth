import { useRouter } from "next/router";

const DashboardPage = () => {
  // const router = useRouter();

  // const auth = getAuth(app);

  // const [user, loading] = useAuthState(auth);

  // console.log(user);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user) {
  //   router.push("/");
  //   return <div>Please sign in to continue</div>;
  // }

  // const logout = () => {
  //   signOut(auth);
  //   router.push("/");
  // };

  return <p>Protected URL</p>;
};

export default DashboardPage;

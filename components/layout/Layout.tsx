import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className="py-0 px-8">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

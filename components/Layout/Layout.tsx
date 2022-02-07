import Navbar from "../Navbar/Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <section className="flex w-full">
      <Navbar />
      <main className="w-full">{children}</main>
    </section>
  );
};

export default Layout;

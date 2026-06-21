import Navbar from "./Navbar";
import Footer from "./Footer";

function PageShell({ children, noFooter = false }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!noFooter && <Footer />}
    </div>
  );
}

export default PageShell;

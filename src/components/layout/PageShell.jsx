import Navbar from "./Navbar";
import AccountNavbar from "./AccountNavbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

function PageShell({ children, noFooter = false }) {
  const { pathname } = useLocation();
  const usesAccountNav =
    pathname.startsWith("/user") ||
    pathname.startsWith("/seller") ||
    pathname.startsWith("/products/create") ||
    pathname.startsWith("/products/edit");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {usesAccountNav ? <AccountNavbar /> : <Navbar />}
      <main className="flex-1">{children}</main>
      {!noFooter && <Footer />}
    </div>
  );
}

export default PageShell;

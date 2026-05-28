import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/home/Hero";
import ProductGrid from "../../components/products/ProductGrid";
import Footer from "../../components/layout/Footer";
import MarketplaceFilters from "../../components/home/SidebarFilter";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../hooks/useProducts";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

function Home() {
  const { user, loading: authLoading } = useAuth();
  const { products, loading: productsLoading, error } = useProducts();

  if (authLoading) return <h2 className="p-10">Loading...</h2>;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {user ? `Welcome back, ${user.username}` : "Marketplace"}
            </h2>
            <p className="text-gray-500 mt-1">
              {user
                ? "Here are recommendations selected for your account."
                : "Discover listings from trusted sellers around Kenya."}
            </p>
          </div>

          <div className="flex gap-3">
            <select className="border border-gray-300 rounded-lg px-4 py-3">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Phones</option>
              <option>Fashion</option>
              <option>Home</option>
            </select>

            <select className="border border-gray-300 rounded-lg px-4 py-3">
              <option>Latest Listings</option>
              <option>Lowest Price</option>
              <option>Highest Trust</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <MarketplaceFilters />

          <section className="lg:col-span-3">
            {productsLoading ? (
              <Loader />
            ) : error ? (
              <p className="text-red-500 text-sm py-10 text-center">{error}</p>
            ) : products.length === 0 ? (
              <EmptyState icon="🛍️" title="No products yet" description="Be the first to list a product!" />
            ) : (
              <ProductGrid products={products} />
            )}
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

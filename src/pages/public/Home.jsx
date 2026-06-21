import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/home/Hero";
import ProductGrid from "../../components/products/ProductGrid";
import Footer from "../../components/layout/Footer";
import MarketplaceFilters from "../../components/home/SidebarFilter";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../hooks/useProducts";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

// Number of products shown per page in the marketplace grid.
const PAGE_SIZE = 20;

function Home() {
  const { user, loading: authLoading } = useAuth();
  const { products, loading: productsLoading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  // Slice only the products that belong on the current page.
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [currentPage, products]);

  // If a data change removes the current page, fall back to the last valid page.
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  if (authLoading) return <Loader fullScreen />;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
        {/* Section header: personalized title and sort/filter controls. */}
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

        {/* Two-column layout: filter sidebar on the left, product grid on the right. */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <MarketplaceFilters />

          <section className="lg:col-span-3">
            {productsLoading ? (
              <Loader />
            ) : error ? (
              <p className="text-red-500 text-sm py-10 text-center">{error}</p>
            ) : products.length === 0 ? (
              <EmptyState icon="📦" title="No listings yet" message="Be the first to post a product!" />
            ) : (
              <>
                <ProductGrid products={paginatedProducts} />

                {/* Pagination controls shown only when there is more than one page. */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2 mt-8 pt-5 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-green-600 hover:text-green-700 transition"
                    >
                      Previous
                    </button>
                    <span className="min-w-20 text-center text-sm font-semibold text-gray-700">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                    type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-green-600 hover:text-green-700 transition"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

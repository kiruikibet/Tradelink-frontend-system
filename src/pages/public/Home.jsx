import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/home/Hero";
import ProductGrid from "../../components/products/ProductGrid";
import Footer from "../../components/layout/Footer";
import { products } from "../../data/products";
import MarketplaceFilters from "../../components/home/SidebarFilter";

function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />
     
     <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
  
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
    
    <div>
      <h2 className="text-2xl font-bold">Marketplace</h2>

      <p className="text-gray-500 mt-1">
        Discover listings from trusted sellers around Kenya.
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
    
    {/* Sidebar */}
   <MarketplaceFilters />

    {/* Marketplace Products */}
    <section className="lg:col-span-3">
      <ProductGrid products={products} />
    </section>
  </div>
</section>
      <Footer />
    </div>
  );
}

export default Home;
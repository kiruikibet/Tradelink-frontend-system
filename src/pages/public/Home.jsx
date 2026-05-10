import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/home/Hero";
import TopSellers from "../../components/home/TopSellers";
import ProductSection from "../../components/home/ProductSection";
import SellerAppBanner from "../../components/home/SellerAppBanner";
import Footer from "../../components/layout/Footer";

function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />
      <TopSellers />
      <ProductSection title="Flash Deals" timer />
      <ProductSection title="Recommended For You" unlimited />
      <SellerAppBanner />
      <Footer />
    </div>
  );
}

export default Home;
function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-4 md:px-6 mt-10 py-10 border-t">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div>
          <h2 className="text-xl font-bold">Trade<span className="text-green-700">Link</span></h2>
          <p className="text-gray-500 mt-3">Your trusted online marketplace</p>
        </div>

        <div>
          <h3 className="font-bold mb-3">Customer Service</h3>
          <p>Help Center</p>
          <p>How to Buy</p>
          <p>Shipping & Delivery</p>
          <p>Returns & Refunds</p>
        </div>

        <div>
          <h3 className="font-bold mb-3">About Us</h3>
          <p>About TradeLink</p>
          <p>Careers</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>

        <div>
          <h3 className="font-bold mb-3">For Sellers</h3>
          <p>Sell on TradeLink</p>
          <p>Seller Center</p>
          <p>Pricing</p>
          <p>Business Hub</p>
        </div>

        <div>
          <h3 className="font-bold mb-3">Newsletter</h3>
          <div className="flex">
            <input className="border px-3 py-2 rounded-l-md w-full" placeholder="Enter your email" />
            <button className="bg-green-700 text-white px-4 rounded-r-md">Subscribe</button>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-8">© 2025 TradeLink. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
function SellerAppBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-orange-50 rounded-xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Sell on TradeLink</h2>
            <p className="text-gray-600 mt-2">Reach millions of customers</p>
            <button className="mt-4 bg-green-700 text-white px-5 py-2 rounded-md">
              Start Selling
            </button>
          </div>
          <div className="text-7xl">📦</div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Download Our App</h2>
            <p className="text-gray-600 mt-2">Shop anytime, anywhere</p>
            <div className="flex gap-3 mt-4">
              <button className="bg-black text-white px-4 py-2 rounded">Google Play</button>
              <button className="bg-black text-white px-4 py-2 rounded">App Store</button>
            </div>
          </div>
          <div className="text-7xl">📱</div>
        </div>
      </div>
    </section>
  );
}

export default SellerAppBanner;
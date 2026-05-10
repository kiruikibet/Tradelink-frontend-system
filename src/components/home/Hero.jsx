function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Big Banner */}
        <div className="lg:col-span-6 bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl p-8 min-h-[320px] text-white flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">MEGA SALE</h1>
            <p className="mt-3 text-xl">Up to 50% Off</p>
            <p className="mt-1 text-sm text-gray-200">On Electronics</p>

            <button className="mt-6 bg-green-700 px-6 py-3 rounded-md font-semibold">
              Shop Now
            </button>
          </div>

          <div className="text-8xl hidden md:block">💻🎧</div>
        </div>

        {/* Middle Small Banners */}
        <div className="lg:col-span-4 grid grid-rows-2 gap-4">
          <div className="bg-orange-50 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-xl">FASHION DEALS</h2>
              <p className="text-sm mt-1">30% - 70% Off</p>
              <p className="text-xs text-gray-600">On selected items</p>
              <button className="mt-4 bg-white border px-4 py-2 rounded-md text-sm">
                Shop Now
              </button>
            </div>
            <div className="text-6xl">👕</div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-xl">HOME ESSENTIALS</h2>
              <p className="text-sm mt-1">20% - 60% Off</p>
              <p className="text-xs text-gray-600">Make your home better</p>
              <button className="mt-4 bg-white border px-4 py-2 rounded-md text-sm">
                Shop Now
              </button>
            </div>
            <div className="text-6xl">🛋️</div>
          </div>
        </div>

        {/* Deal of the Day */}
        <div className="lg:col-span-2 bg-green-50 rounded-xl p-5 min-h-[320px]">
          <h2 className="font-bold text-center">DEAL OF THE DAY</h2>

          <div className="flex justify-center gap-2 mt-4 text-center">
            <div className="bg-white rounded-md px-2 py-1">
              <p className="font-bold">08</p>
              <span className="text-xs">Hours</span>
            </div>
            <div className="bg-white rounded-md px-2 py-1">
              <p className="font-bold">45</p>
              <span className="text-xs">Mins</span>
            </div>
            <div className="bg-white rounded-md px-2 py-1">
              <p className="font-bold">32</p>
              <span className="text-xs">Secs</span>
            </div>
          </div>

          <div className="text-7xl text-center mt-6">📱</div>

          <h3 className="font-semibold mt-4">iPhone 13 128GB</h3>
          <p className="text-green-700 font-bold">KSh 89,999</p>
          <p className="text-sm text-gray-400 line-through">KSh 119,999</p>

          <button className="mt-4 w-full bg-green-700 text-white py-3 rounded-md font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
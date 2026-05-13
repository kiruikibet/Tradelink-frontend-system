function MarketplaceFilters() {
  return (
    <aside className="bg-white border border-gray-200 rounded-2xl p-5 h-fit sticky top-4 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl">Filters</h3>

        <button className="text-sm text-green-700 font-semibold hover:underline">
          Reset
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">
          Search
        </label>

        <input
          type="text"
          placeholder="Search products..."
          className="
            mt-2
            w-full
            border border-gray-300
            rounded-xl
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-green-700
            focus:ring-2
            focus:ring-green-100
          "
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">
           Choose Category
        </label>

       <div className="relative mt-2">
  <select
    className="
      w-full
      appearance-none
      bg-white
      border border-gray-200
      rounded-2xl
      px-5
      py-3.5
      pr-12
      text-[15px]
      font-medium
      tracking-wide
      text-gray-700
      shadow-sm
      outline-none
      transition-all
      duration-200
      hover:border-gray-300
      hover:shadow-md
      focus:border-green-700
      focus:ring-4
      focus:ring-green-100
      cursor-pointer
    "
  >
    <option>All Categories</option>
    <option>Phones & Tablets</option>
    <option>Laptops & Computers</option>
    <option>Electronics</option>
    <option>Fashion</option>
    <option>Home & Furniture</option>
    <option>Vehicles</option>
  </select>

  <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
    <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-gray-400 rotate-45 -translate-y-1"></div>
  </div>
</div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">
          Price Range
        </label>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <input
            type="number"
            step="100"
            placeholder="Min"
            className="
              border border-gray-300
              rounded-xl
              px-3
              py-3
              text-sm
              outline-none
              transition
              focus:border-green-700
              focus:ring-2
              focus:ring-green-100
            "
          />

          <input
            type="number"
            step="100"
            placeholder="Max"
            className="
              border border-gray-300
              rounded-xl
              px-3
              py-3
              text-sm
              outline-none
              transition
              focus:border-green-700
              focus:ring-2
              focus:ring-green-100
            "
          />
        </div>

        {/* Quick price tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="text-xs border border-gray-300 px-3 py-2 rounded-full hover:border-green-700 hover:text-green-700 transition">
            Under 5K
          </button>

          <button className="text-xs border border-gray-300 px-3 py-2 rounded-full hover:border-green-700 hover:text-green-700 transition">
            5K - 20K
          </button>

          <button className="text-xs border border-gray-300 px-3 py-2 rounded-full hover:border-green-700 hover:text-green-700 transition">
            20K - 50K
          </button>

          <button className="text-xs border border-gray-300 px-3 py-2 rounded-full hover:border-green-700 hover:text-green-700 transition">
            50K+
          </button>
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">
          Location
        </label>

        <div className="relative mt-2">
          <select
            className="
              w-full
              appearance-none
              bg-white
              border border-gray-300
              rounded-xl
              px-4
              py-3
              pr-10
              text-sm
              font-medium
              text-gray-700
              outline-none
              transition
              focus:border-green-700
              focus:ring-2
              focus:ring-green-100
              hover:border-gray-400
              cursor-pointer
            "
          >
            <option>All Locations</option>
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
            <option>Nakuru</option>
            <option>Eldoret</option>
            <option>Meru</option>
          </select>

          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
            ▼
          </div>
        </div>
      </div>

      {/* Condition */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">
          Condition
        </label>

        <div className="mt-3 space-y-3 text-sm text-gray-700">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-green-700" />
            Brand New
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-green-700" />
            Used - Like New
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-green-700" />
            Used - Good
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-green-700" />
            Refurbished
          </label>
        </div>
      </div>

      {/* Seller Trust */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">
          Seller Trust
        </label>

        <div className="mt-3 space-y-3 text-sm text-gray-700">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="trust"
              className="accent-green-700"
            />
            900+ Trust Points
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="trust"
              className="accent-green-700"
            />
            700+ Trust Points
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="trust"
              className="accent-green-700"
            />
            500+ Trust Points
          </label>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">
          Availability
        </label>

        <div className="mt-3 space-y-3 text-sm text-gray-700">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-green-700" />
            Available
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-green-700" />
            Negotiable
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 accent-green-700" />
            Delivery Available
          </label>
        </div>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">
          Sort By
        </label>

        <div className="relative mt-2">
          <select
            className="
              w-full
              appearance-none
              bg-white
              border border-gray-300
              rounded-xl
              px-4
              py-3
              pr-10
              text-sm
              font-medium
              text-gray-700
              outline-none
              transition
              focus:border-green-700
              focus:ring-2
              focus:ring-green-100
              hover:border-gray-400
              cursor-pointer
            "
          >
            <option>Latest Listings</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
            <option>Highest Rated</option>
            <option>Most Trusted Sellers</option>
          </select>

          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
            ▼
          </div>
        </div>
      </div>

      {/* Buttons */}
      <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition">
        Apply Filters
      </button>

      <button className="w-full mt-3 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
        Clear All
      </button>
    </aside>
  );
}

export default MarketplaceFilters;
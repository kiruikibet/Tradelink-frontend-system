function ProductSection({ title, timer, unlimited = false ,limit }) {
  const products = [
    { name: "HP Pavilion Laptop", price: "KSh 74,999", old: "KSh 89,999", img: "💻", discount: "-20%", seller: "Tech Hub", trust: 980 },
    { name: "Sony WH-1000XM4", price: "KSh 34,999", old: "KSh 41,176", img: "🎧", discount: "-15%", seller: "Gadget World", trust: 870 },
    { name: "Nike Air Max 270", price: "KSh 14,999", old: "KSh 19,999", img: "👟", discount: "-25%", seller: "Style Haven", trust: 790 },
    { name: "Samsung 43” Smart TV", price: "KSh 36,999", old: "KSh 44,999", img: "📺", discount: "-18%", seller: "Electro Zone", trust: 690 },
    { name: "Canon EOS 2000D", price: "KSh 54,999", old: "KSh 66,999", img: "📷", discount: "-20%", seller: "Camera Pro", trust: 640 },
    { name: "iPhone 13 128GB", price: "KSh 89,999", old: "KSh 99,999", img: "📱", discount: "-10%", seller: "Phone Palace", trust: 760 },
    { name: "JBL Flip 5 Speaker", price: "KSh 11,999", old: "KSh 14,999", img: "🔊", discount: "-12%", seller: "Audio Kings", trust: 610 },
    { name: "Xiaomi Redmi Note 12", price: "KSh 24,999", old: "KSh 29,999", img: "📱", discount: "-18%", seller: "Mobile Hub", trust: 720 },
    { name: "Adidas Backpack", price: "KSh 3,499", old: "KSh 4,999", img: "🎒", discount: "-30%", seller: "Urban Store", trust: 540 },
    { name: "Samsung Galaxy Buds", price: "KSh 3,099", old: "KSh 4,500", img: "🎧", discount: "-20%", seller: "Sound Zone", trust: 680 },
  ];
  const visibleProducts = unlimited ? products : products.slice(0, limit || 6);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">{title}</h2>
          {timer && (
            <span className="text-red-600 text-sm font-semibold">
              Ends in: 08 : 45 : 32
            </span>
          )}
        </div>

        {!unlimited && (
          <button className="text-green-700 font-semibold text-sm">
            View all →
          </button>
        )}
      </div>

      <div
        className={
            unlimited
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-h-[650px] overflow-y-auto pr-2"
                : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 overflow-hidden"
        }
    >
        {visibleProducts.map((product, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
          >
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
              {product.discount}
            </span>

            <button className="absolute top-3 right-3 text-gray-400">♡</button>

            <div className="h-32 flex items-center justify-center text-7xl">
              {product.img}
            </div>

            <h3 className="text-sm font-medium mt-3">{product.name}</h3>

            <div className="text-yellow-500 text-sm mt-2">
              ★ 4.6 <span className="text-gray-500">(230)</span>
            </div>

            <p className="text-xs text-gray-600 mt-1">
              Seller: <span className="font-semibold">{product.seller}</span>
            </p>

            <p className="text-xs text-green-700 font-semibold mt-1">
              {product.trust} Trust Points
            </p>

            <div className="mt-2">
              <p className="text-green-700 font-bold">{product.price}</p>
              <p className="text-gray-400 text-sm line-through">{product.old}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
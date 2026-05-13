import ProductCard from "./ProductCard";
import { ProfileProductCard } from "../products/ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
export function ProfileProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProfileProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
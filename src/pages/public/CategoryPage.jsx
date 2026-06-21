import { useParams } from "react-router-dom";
import { useMemo } from "react";
import PageShell from "../../components/layout/PageShell";
import ProductGrid from "../../components/products/ProductGrid";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { useProducts } from "../../hooks/useProducts";

function CategoryPage() {
  const { categoryName } = useParams();
  const { products, loading, error } = useProducts();

  const filtered = useMemo(
    () =>
      products.filter(
        (p) => p.category_name?.toLowerCase() === categoryName?.toLowerCase()
      ),
    [products, categoryName]
  );

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <h2 className="text-2xl font-bold capitalize mb-1">{categoryName}</h2>
        <p className="text-sm text-gray-500 mb-6">
          {loading ? "Loading..." : `${filtered.length} listing(s)`}
        </p>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : filtered.length === 0 ? (
          <EmptyState icon="📂" title="No listings yet" message="No products in this category." />
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>
    </PageShell>
  );
}

export default CategoryPage;

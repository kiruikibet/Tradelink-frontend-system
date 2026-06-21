import { useSearchParams } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import ProductGrid from "../../components/products/ProductGrid";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { useProducts } from "../../hooks/useProducts";
import { useMemo } from "react";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { products, loading, error } = useProducts();

  const results = useMemo(
    () =>
      products.filter((p) =>
        p.name?.toLowerCase().includes(query.toLowerCase())
      ),
    [products, query]
  );

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <h2 className="text-xl font-bold mb-1">
          {query ? `Results for "${query}"` : "All Products"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {loading ? "Searching..." : `${results.length} product(s) found`}
        </p>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : results.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No results found"
            message={`We couldn't find anything for "${query}". Try different keywords.`}
          />
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </PageShell>
  );
}

export default SearchResults;

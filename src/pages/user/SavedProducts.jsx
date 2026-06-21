import PageShell from "../../components/layout/PageShell";
import EmptyState from "../../components/common/EmptyState";

function SavedProducts() {
  // TODO: connect to saved/favorites API
  const saved = [];

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Saved Products</h2>
        {saved.length === 0 ? (
          <EmptyState
            icon="❤️"
            title="No saved products"
            message="Products you save will appear here."
          />
        ) : null}
      </div>
    </PageShell>
  );
}

export default SavedProducts;

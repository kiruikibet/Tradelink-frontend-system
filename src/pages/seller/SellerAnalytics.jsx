import PageShell from "../../components/layout/PageShell";

function SellerAnalytics() {
  // TODO: fetch analytics from API

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Seller Analytics</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {["Total Revenue", "Units Sold", "Conversion Rate"].map((label) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-xs text-gray-400 uppercase font-semibold">{label}</p>
              <p className="text-3xl font-extrabold mt-2 text-gray-800">—</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold mb-4">Sales Over Time</h3>
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
            Chart will appear here once API is connected.
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default SellerAnalytics;

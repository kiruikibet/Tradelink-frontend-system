import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";

function MeetupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  // TODO: fetch meetup details from API

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
          <h2 className="text-xl font-bold">Meetup Details</h2>
          <p className="text-sm text-gray-400">Transaction #{id}</p>

          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: <FiMapPin />, label: "Location", value: "—" },
              { icon: <FiCalendar />, label: "Date", value: "—" },
              { icon: <FiClock />, label: "Time", value: "—" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <span className="text-green-700 text-xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="font-semibold text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default MeetupDetails;

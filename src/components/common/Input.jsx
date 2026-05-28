function Input({ label, className = "", ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        className={`w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-600 bg-white ${className}`}
        {...props}
      />
    </div>
  );
}

export default Input;

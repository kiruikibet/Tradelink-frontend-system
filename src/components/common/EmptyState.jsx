function EmptyState({ icon = "🛍️", title, description, message, action }) {
  const text = description || message;
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-5">
        {icon}
      </div>
      <p className="text-lg font-semibold text-gray-700">{title}</p>
      {text && <p className="text-sm text-gray-400 mt-1">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default EmptyState;

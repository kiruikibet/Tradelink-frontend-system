function Button({ children, variant = "primary", className = "", disabled, ...props }) {
  const base = "px-5 py-2.5 rounded-xl font-semibold text-sm transition disabled:opacity-60";
  const variants = {
    primary: "bg-green-700 hover:bg-green-600 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
    danger: "bg-red-500 hover:bg-red-400 text-white",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

export default Button;

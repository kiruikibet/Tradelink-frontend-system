function Loader({ fullScreen = false }) {
  const spinner = (
    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
  );
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">{spinner}</div>
    );
  }
  return <div className="flex justify-center py-20">{spinner}</div>;
}

export default Loader;

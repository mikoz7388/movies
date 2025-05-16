export const LoadingSpinner = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <span className="sr-only">loading</span>
      <div className="size-16 animate-spin rounded-full border-t-4 border-blue-500 border-opacity-75"></div>
    </div>
  );
};

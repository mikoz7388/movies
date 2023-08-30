export const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="sr-only">loading</span>
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500 border-opacity-75"></div>
    </div>
  );
};

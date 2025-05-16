export const LoadingSpinner = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <span className="sr-only">loading</span>
      <div className="size-16 animate-spin rounded-full border-t-4 border-blue-500 border-opacity-75"></div>
    </div>
  );
};

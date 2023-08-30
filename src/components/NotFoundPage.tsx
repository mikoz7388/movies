const NotFoundPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>

        <a href="/" className="mt-4 block text-blue-500 hover:underline">
          Go back to home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;

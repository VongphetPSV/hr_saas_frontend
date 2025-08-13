import Spinner from '../Spinner';

export const ResolvingTenant = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Spinner className="h-12 w-12 text-primary-600" />
      <h2 className="mt-4 text-lg font-medium text-gray-900">
        Preparing your workspace...
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        This will only take a moment
      </p>
    </div>
  );
};

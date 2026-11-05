export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>

      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
        Loading StudioSpace...
      </p>
    </div>
  );
}
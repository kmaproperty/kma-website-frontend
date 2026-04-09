'use client';

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8">
      <p className="text-lg font-medium text-gray-700">
        Something went wrong loading this page.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-blue px-6 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Try Again
      </button>
    </div>
  );
}

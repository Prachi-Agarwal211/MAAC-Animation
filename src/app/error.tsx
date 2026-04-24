"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-display text-[#FFD700] mb-4 font-light uppercase leading-[1.1] tracking-[0.1em]">Oops!</h1>
        <p className="text-[#A8A29C] text-lg mb-8">
          Something went wrong. Please try again.
        </p>
        <button
          onClick={reset}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

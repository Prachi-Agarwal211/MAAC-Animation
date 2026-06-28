export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center" role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
      <div className="relative">
        <div className="w-16 h-16 border-2 border-white/10 rounded-full" />
        <div
          className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-[#FFD700] rounded-full animate-spin"
          style={{ animationDuration: '0.8s' }}
        />
      </div>
    </div>
  );
}

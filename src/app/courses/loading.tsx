export default function Loading() {
  return (
    <div className="min-h-[60vh] bg-[#0C0C0C] flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-4">
          <div className="w-12 h-12 border-2 border-white/10 rounded-full" />
          <div
            className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-[#C4A882] rounded-full animate-spin"
            style={{ animationDuration: '0.8s' }}
          />
        </div>
        <p className="text-white/85 text-sm">Loading courses...</p>
      </div>
    </div>
  );
}

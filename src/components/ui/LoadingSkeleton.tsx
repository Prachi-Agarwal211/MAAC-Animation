export default function LoadingSkeleton() {
  return (
    <div className="w-full flex-col p-10 animate-pulse bg-[#080808]">
      <div className="h-64 bg-white/5 rounded-xl w-full mb-4"></div>
      <div className="h-8 bg-white/5 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-white/5 rounded w-1/2"></div>
    </div>
  );
}

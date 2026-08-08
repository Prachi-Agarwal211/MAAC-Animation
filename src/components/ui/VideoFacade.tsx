"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoFacadeProps {
  youtubeId: string;
  title?: string;
  className?: string;
}

export default function VideoFacade({ youtubeId, title = "Video player", className }: VideoFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // maxresdefault might not exist for some 720p videos, but for premium HD videos it's almost always there.
  const posterUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <div 
      className={cn(
        "relative w-full h-full overflow-hidden shadow-black/80 group bg-black cursor-pointer",
        className
      )}
      onClick={() => setIsPlaying(true)}
    >
      {!isPlaying ? (
        <>
          <Image 
            src={posterUrl}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            alt={`${title} Cover`}
            className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:-translate-y-1"
            placeholder="empty"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/40 group-hover:shadow-[0_0_40px_rgba(227,24,55,0.4)]">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1 md:ml-2 drop-shadow-md" fill="currentColor" />
              </div>
          </div>
        </>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 0 }}
        />
      )}
    </div>
  );
}

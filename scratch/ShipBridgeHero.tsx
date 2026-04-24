'use client'

import { motion } from "framer-motion"
import { Menu, ArrowRight } from "lucide-react"
import Image from "next/image"

const LogoSVG = ({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 5L90 25V75L50 95L10 75V25L50 5Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
    <path d="M30 40L50 30L70 40V60L50 70L30 60V40Z" fill="currentColor" />
    <path d="M50 30V70" stroke="black" strokeWidth="2" />
    <path d="M30 40L70 40" stroke="black" strokeWidth="2" />
  </svg>
)

export default function ShipBridgeHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Media with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-80"
          poster="/hero-bg.png"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 md:px-16">
        <div className="flex items-center gap-3">
          <div className="text-gold">
            <LogoSVG className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <span className="text-lg md:text-xl font-neue-haas font-bold tracking-[0.3em] text-gold uppercase mt-1">
            SHIP BRIDGE
          </span>
        </div>

        <div className="hidden md:flex items-center gap-12 font-neue-haas text-sm tracking-wider uppercase opacity-80">
          <a href="#" className="hover:text-gold transition-colors">About</a>
          <a href="#" className="hover:text-gold transition-colors">Technology</a>
          <a href="#" className="hover:text-gold transition-colors">Solutions</a>
          <a href="#" className="hover:text-gold transition-colors">Careers</a>
        </div>

        <div className="flex items-center gap-6">
          <button className="rounded-full border border-white/30 px-8 py-3 font-neue-haas text-sm uppercase tracking-wider backdrop-blur-md hover:bg-white hover:text-black transition-all">
            Contact
          </button>
          <button className="p-2 opacity-80 hover:opacity-100 transition-opacity">
            <Menu className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 h-full w-full flex flex-col justify-center px-8 md:px-24">
        
        {/* Left Side Indicators */}
        <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-6">
          <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>

        <div className="max-w-3xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gold font-neue-haas text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-6"
          >
            AI-POWERED LOGISTICS ERP
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-zagma text-6xl md:text-8xl leading-tight mb-12"
          >
            Intelligence <br /> That Moves <br /> The World.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/30 group-hover:border-gold group-hover:scale-110 transition-all">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:text-gold transition-colors" />
            </div>
            <span className="font-neue-haas text-xs md:text-sm uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
              See How It Works
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="font-neue-haas text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">
          Scroll to Explore
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  )
}

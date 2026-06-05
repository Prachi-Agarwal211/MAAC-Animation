"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw, Award, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

// --- Quiz Data ---
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "When watching a blockbuster like 'RRR' or 'Avatar', what's the first thing that grabs your attention?",
    options: [
      { text: "The way the characters express emotion through their faces and eyes.", role: "animator" },
      { text: "The massive explosions and how digital magic blends with real footage.", role: "vfx" },
      { text: "The incredible detail in the environments, weapons, and costumes.", role: "modeler" },
      { text: "The cool title sequences and how the logos move on screen.", role: "mograph" }
    ]
  },
  {
    id: 2,
    question: "If you had a free weekend to start a creative project, you'd most likely:",
    options: [
      { text: "Record a funny acting skit or a stop-motion dance video.", role: "animator" },
      { text: "Film a 'magic trick' and try to edit it to look impossible.", role: "vfx" },
      { text: "Build a highly detailed LEGO set or a DIY architectural model.", role: "modeler" },
      { text: "Design a stylish social media poster or a YouTube channel intro.", role: "mograph" }
    ]
  },
  {
    id: 3,
    question: "What is your 'Creative Superpower'?",
    options: [
      { text: "Observation—I notice how people walk and express feelings.", role: "animator" },
      { text: "Problem Solving—I love figuring out how visual tricks are done.", role: "vfx" },
      { text: "Patience—I can spend hours perfecting one intricate 3D object.", role: "modeler" },
      { text: "Sense of Rhythm—I have a natural feel for timing and music beats.", role: "mograph" }
    ]
  },
  {
    id: 4,
    question: "Which workplace environment sounds most exciting to you?",
    options: [
      { text: "A Pixar-style studio where storytelling and performance are everything.", role: "animator" },
      { text: "A high-tech VFX house working on the next Marvel or Bollywood epic.", role: "vfx" },
      { text: "A game studio building massive open worlds like GTA or Elden Ring.", role: "game" },
      { text: "A trendy design agency creating premium ads and brand videos.", role: "mograph" }
    ]
  },
  {
    id: 5,
    question: "When walking through a busy market, what catches your eye?",
    options: [
      { text: "The unique gestures and personalities of the people around.", role: "animator" },
      { text: "How the light creates shadows and reflections on different surfaces.", role: "vfx" },
      { text: "The structure and textures of the old buildings and carvings.", role: "modeler" },
      { text: "The bold colors and typography of the shop signs.", role: "mograph" }
    ]
  },
  {
    id: 6,
    question: "In a group project, what is your preferred role?",
    options: [
      { text: "The 'Actor'—Bringing the main characters to life.", role: "animator" },
      { text: "The 'Scientist'—Fixing glitches and adding the final polish.", role: "vfx" },
      { text: "The 'Architect'—Building the world and the props from scratch.", role: "modeler" },
      { text: "The 'Stylist'—Making sure everything looks modern and visually balanced.", role: "mograph" }
    ]
  },
  {
    id: 7,
    question: "Which software capability would you be most excited to master?",
    options: [
      { text: "A tool that controls the realistic movement of a digital human.", role: "animator" },
      { text: "A system that simulates realistic fire, water, and debris.", role: "vfx" },
      { text: "Digital clay that lets you sculpt creatures and characters.", role: "modeler" },
      { text: "Dynamic text and shapes that move perfectly to a music track.", role: "mograph" }
    ]
  },
  {
    id: 8,
    question: "What would make you most proud of your finished work?",
    options: [
      { text: "When the audience feels a deep emotional connection to my character.", role: "animator" },
      { text: "When people can't tell what is real and what is computer-generated.", role: "vfx" },
      { text: "When someone is stunned by the sheer realism of my 3D assets.", role: "modeler" },
      { text: "When my work is described as 'cool', 'trendy', and 'visually iconic'.", role: "mograph" }
    ]
  },
  {
    id: 9,
    question: "Pick your favorite visual style:",
    options: [
      { text: "Disney/Pixar style characters with big, expressive personalities.", role: "animator" },
      { text: "Cinematic, hyper-realistic scenes like Avatar or Baahubali.", role: "vfx" },
      { text: "Detailed environment art from games like Cyberpunk 2077.", role: "game" },
      { text: "Sleek, minimalist motion graphics with bold colors.", role: "mograph" }
    ]
  },
  {
    id: 10,
    question: "What kind of challenge excites you more?",
    options: [
      { text: "Perfecting a subtle facial expression for a dramatic scene.", role: "animator" },
      { text: "Blending a CG spaceship perfectly into a real city video.", role: "vfx" },
      { text: "Modeling a complex futuristic vehicle from the inside out.", role: "modeler" },
      { text: "Creating a high-energy intro for a global sports event.", role: "mograph" }
    ]
  },
  {
    id: 11,
    question: "How do you handle details?",
    options: [
      { text: "I focus on the 'flow' and 'energy' of a movement.", role: "animator" },
      { text: "I look for technical perfection and pixel-perfect blending.", role: "vfx" },
      { text: "I am obsessive about textures, scratches, and micro-details.", role: "modeler" },
      { text: "I focus on the composition, layout, and visual impact.", role: "mograph" }
    ]
  },
  {
    id: 12,
    question: "Your dream career achievement would be:",
    options: [
      { text: "Winning an award for 'Best Animated Character'.", role: "animator" },
      { text: "Leading the VFX team on a billion-dollar superhero movie.", role: "vfx" },
      { text: "Seeing my 3D environments in a Game of the Year title.", role: "game" },
      { text: "Creating a visual brand identity that goes viral globally.", role: "mograph" }
    ]
  }
];

// --- Results Data ---
const RESULTS_MAP = {
  animator: {
    title: "3D Character Animator",
    description: "You are a digital actor! Your passion lies in bringing characters to life through movement, expression, and performance.",
    whyFits: "Your keen observation of human behavior and sense of timing makes you perfect for breathe life into digital puppets.",
    strengths: ["Acting & Performance", "Timing & Rhythm", "Storytelling", "Anatomy Awareness"],
    course: "AD3D Edge Plus (Advanced Animation Track)",
    courseReason: "This flagship program focuses on the 12 principles of animation and advanced character performance.",
    gradient: "from-orange-500 to-red-600"
  },
  vfx: {
    title: "VFX Artist / Compositor",
    description: "You are a digital magician! You love the intersection of science and art, creating effects that seem impossible yet look real.",
    whyFits: "Your problem-solving nature and eye for technical detail allow you to blend digital elements seamlessly with reality.",
    strengths: ["Technical Logic", "Lighting & Composition", "Simulation", "Attention to Detail"],
    course: "ADVFX Plus (Advanced Visual Effects Program)",
    courseReason: "The industry-standard program for mastering compositing, dynamics, and high-end cinematic effects.",
    gradient: "from-blue-500 to-indigo-600"
  },
  modeler: {
    title: "3D Modeler & Environment Artist",
    description: "You are a digital architect! You enjoy building assets, characters, and worlds from the ground up with incredible precision.",
    whyFits: "Your patience and appreciation for structure and texture make you the perfect creator of high-end 3D assets.",
    strengths: ["Spatial Awareness", "Sculpting & Anatomy", "Texturing", "Structural Precision"],
    course: "AD3D Edge Plus (Modeling & Texturing Track)",
    courseReason: "This course masters the pipeline for creating everything from realistic humans to complex environments.",
    gradient: "from-emerald-500 to-teal-600"
  },
  mograph: {
    title: "Motion Graphics Designer",
    description: "You are a visual communicator! You excel at making graphics, typography, and shapes move in a stylish, rhythmic way.",
    whyFits: "Your eye for modern design and 'cool' aesthetics makes you ideal for the high-energy world of advertising and branding.",
    strengths: ["Typography", "Color Theory", "Composition", "Rhythmic Animation"],
    course: "DGWA / Motion Graphics Specialty",
    courseReason: "Specifically designed for artists who want to dominate the advertising, broadcast, and digital media industries.",
    gradient: "from-purple-500 to-pink-600"
  },
  game: {
    title: "Game Artist / Real-time 3D",
    description: "You are a world builder! You thrive in creating interactive experiences where players can live and explore.",
    whyFits: "Your interest in immersive worlds and interactive technology aligns perfectly with the booming global gaming industry.",
    strengths: ["Level Design", "Interactive Logic", "Optimization", "Asset Creation"],
    course: "Game Design & Real-time 3D",
    courseReason: "Learn the specific workflows for Unreal Engine and Unity to build assets for modern gaming consoles and PC.",
    gradient: "from-amber-500 to-orange-600"
  }
};

export default function CareerAssessment() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    animator: 0, vfx: 0, modeler: 0, mograph: 0, game: 0
  });

  const handleStart = () => setStep('quiz');

  const handleOptionSelect = (role: string) => {
    setScores(prev => ({ ...prev, [role]: (prev[role] || 0) + 1 }));
    
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const finalResult = useMemo(() => {
    return Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  }, [scores]);

  const resultData = RESULTS_MAP[finalResult as keyof typeof RESULTS_MAP] || RESULTS_MAP.animator;
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  const resetQuiz = () => {
    setScores({ animator: 0, vfx: 0, modeler: 0, mograph: 0, game: 0 });
    setCurrentQuestion(0);
    setStep('intro');
  };

  return (
    <main className="min-h-screen bg-transparent text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-12 py-12"
            >
              <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-4 glass-card">
                <Sparkles className="text-[#FFD700] w-10 h-10" />
              </div>
              <div className="space-y-4">
                <p className="metallic-gold-text text-[10px] font-bold tracking-[0.4em] uppercase">
                  Vocational Excellence
                </p>
                <h1 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tight leading-none">
                  Discover Your <br />
                  <span className="metallic-gold-text italic">Creative DNA</span>
                </h1>
              </div>
              <p className="text-xl text-[#A8A29C] max-w-2xl mx-auto leading-relaxed font-medium">
                Find your path in the $200B global entertainment industry. Our AI-driven assessment matches your personality to high-growth roles in Animation, VFX, and Gaming.
              </p>
              <button
                onClick={handleStart}
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs overflow-hidden transition-all hover:pr-14"
              >
                <span className="relative z-10">Launch Assessment</span>
                <ChevronRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-[#FFD700] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </button>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFD700]">Module Progress</p>
                    <h3 className="text-sm font-bold text-white/60">
                      Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#FFD700]">{Math.round(progress)}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500]" 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                  />
                </div>
              </div>

              <div className="space-y-10">
                <h2 className="text-2xl md:text-4xl font-display font-bold leading-[1.1] text-white">
                  {QUIZ_QUESTIONS[currentQuestion].question}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option.role)}
                      className="group flex items-center justify-between p-6 md:p-8 bg-white/5 border border-white/10 hover:border-[#FFD700]/40 transition-all text-left glass-card hover:bg-white/[0.08]"
                    >
                      <span className="text-lg md:text-xl text-white/70 group-hover:text-white transition-colors duration-300">
                        {option.text}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FFD700]/50 transition-colors shrink-0 ml-4">
                        <div className="w-2.5 h-2.5 bg-[#FFD700] scale-0 group-hover:scale-100 transition-transform rounded-full shadow-[0_0_15px_rgba(255,215,0,0.4)]" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <div className={`p-10 md:p-16 rounded-[2rem] bg-gradient-to-br ${resultData.gradient} relative overflow-hidden shadow-2xl`}>
                <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 pointer-events-none">
                  <Award size={240} />
                </div>
                <div className="relative z-10 space-y-8">
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <CheckCircle2 size={16} className="text-white" /> Career Blueprint Analysis Complete
                  </div>
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-8xl font-display font-bold uppercase leading-[0.85] tracking-tighter">
                      {resultData.title}
                    </h1>
                    <p className="text-xl md:text-3xl text-white/90 font-medium max-w-2xl leading-tight">
                      {resultData.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem] space-y-6 glass-card">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FFD700]">Aptitude Profile</h3>
                  <p className="text-lg text-[#A8A29C] leading-relaxed">
                    {resultData.whyFits}
                  </p>
                  <div className="pt-6 flex flex-wrap gap-3">
                    {resultData.strengths.map((s, i) => (
                      <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem] space-y-8 glass-card border-t-[#FFD700]/20">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FFD700]">Strategic Pathway</h3>
                    <p className="text-2xl font-display font-bold text-white uppercase tracking-tight">{resultData.course}</p>
                    <p className="text-[#A8A29C] leading-relaxed">
                      {resultData.courseReason}
                    </p>
                  </div>
                  <Link 
                    href="/courses"
                    className="group inline-flex items-center gap-4 text-[#FFD700] font-bold uppercase text-[10px] tracking-[0.3em] hover:text-white transition-all"
                  >
                    Explore Curriculum 
                    <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:text-black transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center items-center py-12">
                <button
                  onClick={() => window.dispatchEvent(new Event("maac:open_contact_modal"))}
                  className="w-full md:w-auto px-12 py-6 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs text-center hover:bg-[#FFD700] transition-all hover:scale-105"
                >
                  Book 1-on-1 Counseling
                </button>
                <button
                  onClick={resetQuiz}
                  className="w-full md:w-auto px-12 py-6 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-xs inline-flex items-center justify-center gap-3 hover:bg-white/10 transition-all glass-card"
                >
                  <RotateCcw size={16} /> Reset Assessment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}


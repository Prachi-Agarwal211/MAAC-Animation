'use client';

import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Award, Users, Clock, Target } from 'lucide-react';

// Type definitions
interface Question {
  id: number;
  question: string;
  options: string[];
}

interface Role {
  name: string;
  match: number;
  description: string;
  whyFits: string;
  skills: string[];
  maacCourse: string;
  cta: string;
}

// 10 carefully designed questions for Creative Career Assessment (Animation/VFX/Game/Motion)
const questions: Question[] = [
  {
    id: 1,
    question: "When watching a big animated or VFX-heavy movie, what grabs your attention the most?",
    options: [
      "The way characters move, act, and show emotion through animation",
      "The magical effects, creatures, explosions, and impossible visuals",
      "The detailed environments, props, textures, lighting, and world-building",
      "The overall style, color, composition, titles, and motion graphics feel"
    ]
  },
  {
    id: 2,
    question: "In your free time or personal projects, you enjoy most:",
    options: [
      "Sketching or acting out character performances and emotions",
      "Experimenting with particle effects, simulations, or compositing tricks",
      "Building 3D models, sculpting details, or creating environments",
      "Making stylish animated graphics, logos, or short motion videos"
    ]
  },
  {
    id: 3,
    question: "When approaching a creative challenge, your natural strength is:",
    options: [
      "Bringing stories and characters to life with believable movement and feeling",
      "Solving complex technical problems to create spectacular or seamless visuals",
      "Paying close attention to every small detail and crafting high-quality assets",
      "Making things look visually striking, modern, and communicate clearly"
    ]
  },
  {
    id: 4,
    question: "Your ideal creative workday would involve:",
    options: [
      "Animating characters and performances based on storyboards and direction",
      "Creating VFX shots, tracking, rotoscoping, or building effects pipelines",
      "Modeling, texturing, lighting, and refining 3D assets from concept to render",
      "Designing and animating motion graphics for ads, explainers, or branding"
    ]
  },
  {
    id: 5,
    question: "How do you feel about detailed, precise, or repetitive creative work?",
    options: [
      "I can do it when it serves the emotional story or performance",
      "I enjoy the technical challenge of getting complex effects perfect",
      "I genuinely love refining details until everything feels just right",
      "I prefer variety and faster creative iterations with quick visual impact"
    ]
  },
  {
    id: 6,
    question: "In a team project, you naturally tend to:",
    options: [
      "Collaborate closely on performances, timing, and storytelling with the director",
      "Be the person who makes the 'magic' or invisible effects happen in post-production",
      "Work independently for long stretches perfecting models and assets",
      "Handle quick-turnaround creative work with fast feedback from clients or team"
    ]
  },
  {
    id: 7,
    question: "What kind of portfolio piece would make you most proud?",
    options: [
      "A character animation reel showing strong acting, timing, and emotion",
      "A VFX breakdown reel with complex compositing or spectacular effects",
      "Highly detailed 3D models or environments with beautiful texturing and lighting",
      "A polished motion graphics reel or animated branding/explainer project"
    ]
  },
  {
    id: 8,
    question: "Your biggest creative strength right now is:",
    options: [
      "Understanding emotion, timing, performance, and storytelling through movement",
      "Technical problem-solving and making impossible things look real",
      "Patience, precision, and a strong eye for form, detail, and craftsmanship",
      "Visual design sense — color, typography, composition, and stylish communication"
    ]
  },
  {
    id: 9,
    question: "When learning new creative software or tools, you focus first on:",
    options: [
      "Animation principles, rigging, and performance tools (Maya, Blender animation)",
      "Tracking, compositing, simulation, and effects tools (Nuke, After Effects, Houdini)",
      "Modeling, sculpting, UVs, texturing, and look development tools",
      "Motion graphics, typography, 2.5D, and design/animation tools"
    ]
  },
  {
    id: 10,
    question: "In 3-5 years, which description excites you the most for your career?",
    options: [
      "Bringing lead characters to life in films, series, or high-end games as an animator",
      "Working on big VFX shots for movies, OTT, or ads as a skilled VFX artist",
      "Creating stunning worlds, characters, and assets as a senior 3D modeler or environment artist",
      "Running creative motion design projects or working in advertising/branding with motion graphics"
    ]
  }
];

// Simple scoring: Each option adds points to relevant roles
// Roles: animator, vfx, modeler, motion, game (concept falls under modeler/animator for simplicity)
function calculateResults(answers: number[]): Role[] {
  const scores = {
    animator: 0,
    vfx: 0,
    modeler: 0,
    motion: 0,
    game: 0
  };

  // Question 1
  if (answers[0] === 0) scores.animator += 3;
  if (answers[0] === 1) scores.vfx += 3;
  if (answers[0] === 2) scores.modeler += 3;
  if (answers[0] === 3) scores.motion += 3;

  // Question 2
  if (answers[1] === 0) scores.animator += 3;
  if (answers[1] === 1) { scores.vfx += 2; scores.game += 1; }
  if (answers[1] === 2) scores.modeler += 3;
  if (answers[1] === 3) scores.motion += 3;

  // Question 3
  if (answers[2] === 0) scores.animator += 3;
  if (answers[2] === 1) scores.vfx += 3;
  if (answers[2] === 2) scores.modeler += 3;
  if (answers[2] === 3) scores.motion += 3;

  // Question 4
  if (answers[3] === 0) scores.animator += 3;
  if (answers[3] === 1) scores.vfx += 3;
  if (answers[3] === 2) scores.modeler += 3;
  if (answers[3] === 3) scores.motion += 3;

  // Question 5
  if (answers[4] === 0) scores.animator += 2;
  if (answers[4] === 1) scores.vfx += 3;
  if (answers[4] === 2) scores.modeler += 3;
  if (answers[4] === 3) scores.motion += 2;

  // Question 6
  if (answers[5] === 0) scores.animator += 2;
  if (answers[5] === 1) scores.vfx += 3;
  if (answers[5] === 2) scores.modeler += 3;
  if (answers[5] === 3) scores.motion += 2;

  // Question 7
  if (answers[6] === 0) scores.animator += 3;
  if (answers[6] === 1) scores.vfx += 3;
  if (answers[6] === 2) scores.modeler += 3;
  if (answers[6] === 3) scores.motion += 3;

  // Question 8
  if (answers[7] === 0) scores.animator += 3;
  if (answers[7] === 1) scores.vfx += 3;
  if (answers[7] === 2) scores.modeler += 3;
  if (answers[7] === 3) scores.motion += 3;

  // Question 9
  if (answers[8] === 0) scores.animator += 3;
  if (answers[8] === 1) scores.vfx += 3;
  if (answers[8] === 2) scores.modeler += 3;
  if (answers[8] === 3) scores.motion += 3;

  // Question 10
  if (answers[9] === 0) scores.animator += 3;
  if (answers[9] === 1) scores.vfx += 3;
  if (answers[9] === 2) scores.modeler += 3;
  if (answers[9] === 3) scores.motion += 3;

  // Add some game bias for certain combinations (tech + fast creative)
  if (answers[1] === 1 || answers[5] === 3) scores.game += 2;

  const totalPossible = 30; // rough max per role
  const roles: Role[] = [
    {
      name: "3D Character Animator",
      match: Math.round((scores.animator / totalPossible) * 100),
      description: "You have a natural talent for bringing characters to life with emotion, timing, and performance. Animators are the actors of the digital world.",
      whyFits: "Your answers show strong interest in movement, storytelling, and emotional expression through animation.",
      skills: ["Animation principles", "Timing & spacing", "Acting & performance", "Maya / Blender", "Storytelling"],
      maacCourse: "AD3D Edge Plus (Advanced Program in 3D Animation)",
      cta: "Perfect foundation for character animation careers in film, OTT, and games."
    },
    {
      name: "VFX Artist (Compositing / FX)",
      match: Math.round((scores.vfx / totalPossible) * 100),
      description: "You love creating the impossible — seamless effects, spectacular sequences, and making magic look real on screen.",
      whyFits: "You are drawn to technical creativity, problem-solving, and the 'wow' factor of visual effects.",
      skills: ["Compositing", "Tracking & rotoscoping", "Particle/FX simulation", "Nuke / After Effects / Houdini", "Problem solving"],
      maacCourse: "ADVFX Plus (Advanced Program in Visual Effects)",
      cta: "High demand role in films, ads, and OTT. Great for those who enjoy both art and tech."
    },
    {
      name: "3D Modeler / Environment Artist",
      match: Math.round((scores.modeler / totalPossible) * 100),
      description: "You excel at crafting detailed worlds, characters, props, and environments with precision and artistic quality.",
      whyFits: "Your responses highlight patience for detail, love of form, and building things from the ground up.",
      skills: ["3D Modeling", "Sculpting (ZBrush)", "Texturing & UVs", "Lighting & Look Dev", "Attention to detail"],
      maacCourse: "AD3D Edge Plus (with strong modeling focus) or 3D & Real-time Design",
      cta: "Essential role in animation, VFX, and especially game development."
    },
    {
      name: "Motion Graphics Designer",
      match: Math.round((scores.motion / totalPossible) * 100),
      description: "You have an eye for stylish visuals, typography, and creating engaging animated content that communicates powerfully.",
      whyFits: "You prefer fast, impactful creative work with strong design sensibility and quick results.",
      skills: ["After Effects", "Typography & Design", "2.5D / Cinema 4D", "Branding & explainer animation", "Client communication"],
      maacCourse: "Motion Graphics Program or ADVFX Plus (Motion Graphics track)",
      cta: "Excellent for advertising, social media, explainer videos, and broadcast design. High freelance potential."
    }
  ];

  // Sort by match descending and return top 3
  return roles.sort((a, b) => b.match - a.match).slice(0, 3);
}

export default function CreativeCareerAssessment() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'results'>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<Role[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const progress = ((currentQuestion) / questions.length) * 100;

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    // Auto-advance after short delay for better UX
    setTimeout(() => {
      const newAnswers = [...answers, optionIndex];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate results
        const calculatedResults = calculateResults(newAnswers);
        setResults(calculatedResults);
        setStep('results');
      }
    }, 350);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const newAnswers = answers.slice(0, -1);
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setStep('landing');
    setCurrentQuestion(0);
    setAnswers([]);
    setResults([]);
    setSelectedOption(null);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero / Landing Section */}
      {step === 'landing' && (
        <div className="relative min-h-screen flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:4px_4px]" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/20">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium tracking-widest">FREE • 5 MINUTES • PERSONALIZED</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
              Discover Your Ideal<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ff00aa]">Creative Career</span><br />
              in Animation & VFX
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10">
              A simple, insightful assessment to find which role in animation, VFX, game art, or motion graphics fits you best — and the exact MAAC course to get you there.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleStart}
                className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-black font-semibold text-lg rounded-2xl hover:bg-white/90 transition-all active:scale-[0.985]"
              >
                Start Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              
              <button
                onClick={() => window.location.href = '/contact'}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 hover:bg-white/5 rounded-2xl text-lg font-medium transition"
              >
                Talk to a Counselor
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Takes ~5 minutes
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" /> Personalized career match
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" /> 1000+ students guided
              </div>
            </div>

            <p className="mt-12 text-xs text-white/40 max-w-md mx-auto">
              Created by MAAC Animation • Powered by industry insights from Animation, VFX & Game professionals
            </p>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {step === 'quiz' && (
        <div className="min-h-screen flex flex-col">
          {/* Progress Bar */}
          <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
            <div 
              className="h-1 bg-gradient-to-r from-[#00f0ff] to-[#a855f7] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex-1 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-3xl">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="text-sm tracking-[3px] text-white/50 mb-1">CREATIVE CAREER ASSESSMENT</div>
                  <div className="text-2xl font-semibold">Question {currentQuestion + 1} of {questions.length}</div>
                </div>
                <button 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="text-sm px-4 py-2 rounded-xl border border-white/20 hover:bg-white/5 disabled:opacity-40 transition"
                >
                  Back
                </button>
              </div>

              {/* Question Card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-8">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-10">
                  {currentQ.question}
                </h2>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedOption !== null}
                      className={`w-full text-left p-6 rounded-2xl border transition-all duration-200 flex items-start gap-4 group
                        ${selectedOption === index 
                          ? 'bg-white/10 border-[#00f0ff] scale-[1.01]' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 active:bg-white/10'}
                      `}
                    >
                      <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono transition
                        ${selectedOption === index ? 'border-[#00f0ff] text-[#00f0ff]' : 'border-white/40 group-hover:border-white/70'}
                      `}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg leading-snug pr-2">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-center text-white/40 text-sm">
                Choose the option that feels most natural to you. There are no wrong answers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {step === 'results' && results.length > 0 && (
        <div className="min-h-screen py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm tracking-widest mb-4">YOUR RESULTS ARE READY</div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">Your Creative Career Matches</h1>
              <p className="text-xl text-white/70 max-w-md mx-auto">
                Based on your answers, here are the roles where you are most likely to thrive.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {results.map((role, index) => (
                <div 
                  key={index}
                  className={`bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col ${index === 0 ? 'md:scale-[1.02] ring-1 ring-white/20' : ''}`}
                >
                  <div className="flex items-baseline justify-between mb-6">
                    <div>
                      <div className="text-sm text-white/50 tracking-widest">#{index + 1} MATCH</div>
                      <h3 className="text-2xl font-semibold tracking-tight mt-1 leading-none">{role.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold tabular-nums tracking-tighter text-[#00f0ff]">{role.match}</div>
                      <div className="text-xs text-white/50 -mt-1">% MATCH</div>
                    </div>
                  </div>

                  <p className="text-white/80 mb-6 flex-1">{role.description}</p>

                  <div className="mb-6">
                    <div className="text-xs tracking-widest text-white/50 mb-2">WHY THIS FITS YOU</div>
                    <p className="text-sm text-white/90">{role.whyFits}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-xs tracking-widest text-white/50 mb-3">KEY STRENGTHS YOU SHOW</div>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, i) => (
                        <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="text-xs tracking-widest text-white/50 mb-2">RECOMMENDED MAAC COURSE</div>
                    <div className="font-semibold text-lg leading-tight mb-3">{role.maacCourse}</div>
                    <p className="text-sm text-white/70 mb-4">{role.cta}</p>
                    
                    <a 
                      href="/contact" 
                      className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-white text-black font-semibold rounded-2xl hover:bg-white/90 active:scale-[0.985] transition text-sm"
                    >
                      Apply or Get Counseling
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <p className="text-white/60 max-w-md mx-auto text-sm">
                This is a starting point based on your natural inclinations. Passion + consistent practice + great training (like at MAAC) is what truly builds world-class careers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button 
                  onClick={handleRestart}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/30 hover:bg-white/5 rounded-2xl font-medium transition"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Assessment
                </button>
                
                <a 
                  href="/courses" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-medium transition"
                >
                  Explore All MAAC Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

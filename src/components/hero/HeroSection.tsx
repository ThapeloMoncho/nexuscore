import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, Cloud, Cpu, Network, ShieldCheck } from 'lucide-react';
import { ResilientImage } from '../ui/ResilientImage';

gsap.registerPlugin(ScrollTrigger);

const DATA_PARTICLES = [
  { id: 1, top: '22%', left: '12%', delay: '0s', duration: '6.5s' },
  { id: 2, top: '38%', left: '78%', delay: '1.2s', duration: '7.5s' },
  { id: 3, top: '64%', left: '28%', delay: '0.8s', duration: '5.8s' },
  { id: 4, top: '52%', left: '62%', delay: '2.1s', duration: '7s' },
  { id: 5, top: '76%', left: '84%', delay: '1.6s', duration: '6.2s' },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const gridLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 768;
    if (prefersReducedMotion || isSmallScreen || !sectionRef.current || !bgLayerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(bgLayerRef.current, {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      if (gridLayerRef.current) {
        gsap.to(gridLayerRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-[#060B16] pt-24 pb-20"
    >
      {/* Parallax Background Infrastructure Layer */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 -top-12 -bottom-12 pointer-events-none will-change-transform"
        aria-hidden="true"
      >
        <ResilientImage
          src="/src/assets/images/hero_infrastructure_1795525674840.jpg"
          alt="Enterprise cloud infrastructure with glowing cyan fiber-optic data trails"
          loading="eager"
          className="w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B16]/85 via-[#060B16]/65 to-[#060B16]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B16] via-[#060B16]/80 to-transparent" />
      </div>

      {/* Digital Grid & Glowing Horizon Layer */}
      <div
        ref={gridLayerRef}
        className="absolute inset-0 nexus-grid-bg opacity-55 pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient Cyan Glow & Moving Data Particles */}
      <div
        className="absolute top-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
        {DATA_PARTICLES.map((particle) => (
          <motion.span
            key={particle.id}
            style={{ top: particle.top, left: particle.left }}
            animate={{ y: [0, -18, 0], opacity: [0.25, 0.85, 0.25] }}
            transition={{
              duration: parseFloat(particle.duration),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: parseFloat(particle.delay),
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Staggered Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-medium tracking-wide text-cyan-300"
            >
              NEXUS CORE IT Consulting · Innovate. Secure. Grow.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-[Space_Grotesk] text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.08] text-slate-50 max-w-2xl"
            >
              Technology that moves your business{' '}
              <span className="text-cyan-400">forward</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl"
            >
              Explore our comprehensive IT, creative and digital solutions. We help businesses build, connect, secure and grow through technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] text-sm sm:text-base font-semibold hover:bg-cyan-300 transition-colors shadow-[0_0_28px_rgba(34,211,238,0.28)] whitespace-nowrap"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <Link
                to="/request-a-quote"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-cyan-400/35 bg-[#0A1324]/80 text-slate-100 font-[Space_Grotesk] text-sm sm:text-base font-semibold hover:border-cyan-300 hover:bg-[#101C33] transition-colors whitespace-nowrap"
              >
                <span>Request a Quote</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Layered 3D Infrastructure Topology Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl nexus-surface p-6 sm:p-7 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
              {/* Animated Network SVG Backdrop */}
              <svg
                viewBox="0 0 360 220"
                className="w-full h-44 sm:h-48 mb-5 rounded-xl bg-[#050A14] border border-slate-800/80"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="heroLineGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Perspective Grid Lines */}
                <path
                  d="M20 180 L340 180 M40 140 L320 140 M70 100 L290 100 M180 30 L180 200 M90 40 L40 200 M270 40 L320 200"
                  stroke="rgba(34,211,238,0.12)"
                  strokeWidth="1"
                />
                {/* Connecting Data Streams */}
                <motion.path
                  d="M72 68 L180 48 L288 74 L180 128 Z"
                  fill="none"
                  stroke="url(#heroLineGrad)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0.4, opacity: 0.5 }}
                  animate={{ pathLength: 1, opacity: [0.45, 0.95, 0.45] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M72 68 L180 128 L180 176"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -24] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M288 74 L180 128 L108 164"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1.25"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, 24] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
                />
                {/* Floating Infrastructure Nodes */}
                {[
                  { cx: 180, cy: 48, r: 8 },
                  { cx: 72, cy: 68, r: 6 },
                  { cx: 288, cy: 74, r: 6 },
                  { cx: 180, cy: 128, r: 9 },
                  { cx: 108, cy: 164, r: 5 },
                  { cx: 180, cy: 176, r: 5 },
                ].map((node, idx) => (
                  <g key={idx}>
                    <circle cx={node.cx} cy={node.cy} r={node.r + 6} fill="rgba(34,211,238,0.12)" />
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={node.r}
                      fill="#0B1324"
                      stroke="#22D3EE"
                      strokeWidth="1.75"
                    />
                  </g>
                ))}
              </svg>

              {/* Clean Architectural Pillars */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-[#070E1C] border border-slate-800/80 p-3.5">
                  <Cloud className="w-4 h-4 text-cyan-400 mb-2" aria-hidden="true" />
                  <p className="font-[Space_Grotesk] font-semibold text-slate-100">Cloud Architecture</p>
                  <p className="text-xs text-slate-400 mt-1">Resilient migration &amp; scaling</p>
                </div>
                <div className="rounded-lg bg-[#070E1C] border border-slate-800/80 p-3.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 mb-2" aria-hidden="true" />
                  <p className="font-[Space_Grotesk] font-semibold text-slate-100">Security Posture</p>
                  <p className="text-xs text-slate-400 mt-1">Access &amp; compliance controls</p>
                </div>
                <div className="rounded-lg bg-[#070E1C] border border-slate-800/80 p-3.5">
                  <Network className="w-4 h-4 text-cyan-400 mb-2" aria-hidden="true" />
                  <p className="font-[Space_Grotesk] font-semibold text-slate-100">Connected Systems</p>
                  <p className="text-xs text-slate-400 mt-1">APIs, web &amp; mobile platforms</p>
                </div>
                <div className="rounded-lg bg-[#070E1C] border border-slate-800/80 p-3.5">
                  <Cpu className="w-4 h-4 text-cyan-400 mb-2" aria-hidden="true" />
                  <p className="font-[Space_Grotesk] font-semibold text-slate-100">Technical Continuity</p>
                  <p className="text-xs text-slate-400 mt-1">Diagnostics &amp; rapid support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <a
        href="#solutions"
        aria-label="Scroll to six core solutions"
        className="hidden sm:inline-flex items-center gap-2 absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
      >
        <span>Scroll to explore</span>
        <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
      </a>
    </section>
  );
}

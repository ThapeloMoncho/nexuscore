import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business, its challenges and goals.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Develop a practical strategy and project scope.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Design and implement the right solutions.',
  },
  {
    number: '04',
    title: 'Secure',
    description: 'Prioritise reliability, security and quality.',
  },
  {
    number: '05',
    title: 'Support',
    description: 'Continue improving and supporting the solution.',
  },
];

export function ApproachTimeline() {
  const containerRef = useRef<HTMLElement | null>(null);
  const horizontalLineRef = useRef<HTMLDivElement | null>(null);
  const verticalLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (horizontalLineRef.current) {
        gsap.fromTo(
          horizontalLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'bottom 65%',
              scrub: true,
            },
          }
        );
      }

      if (verticalLineRef.current) {
        gsap.fromTo(
          verticalLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'bottom 70%',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 lg:py-28 bg-[#080F1E] border-y border-slate-800/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-cyan-300 mb-2">Our Approach</p>
          <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl font-bold text-white">
            A smarter approach to digital transformation.
          </h2>
        </div>

        {/* Desktop Horizontal Connected Timeline */}
        <div className="relative hidden lg:block">
          <div
            className="absolute top-6 left-[8%] right-[8%] h-0.5 bg-slate-800"
            aria-hidden="true"
          >
            <div
              ref={horizontalLineRef}
              className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 origin-left will-change-transform"
            />
          </div>

          <ol className="grid grid-cols-5 gap-6 relative z-10">
            {STAGES.map((stage) => (
              <li key={stage.number} className="flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-[#0B1528] border border-cyan-400/40 flex items-center justify-center font-mono text-sm font-semibold text-cyan-300 tabular-nums shadow-[0_0_20px_rgba(34,211,238,0.14)]">
                  {stage.number}
                </div>
                <h3 className="mt-5 font-[Space_Grotesk] text-xl font-bold text-white">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {stage.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile & Tablet Vertical Connected Timeline */}
        <div className="relative lg:hidden pl-10">
          <div
            className="absolute left-5 top-4 bottom-4 w-0.5 bg-slate-800"
            aria-hidden="true"
          >
            <div
              ref={verticalLineRef}
              className="w-full h-full bg-gradient-to-b from-cyan-400 to-blue-400 origin-top will-change-transform"
            />
          </div>

          <ol className="space-y-8">
            {STAGES.map((stage) => (
              <li key={stage.number} className="relative">
                <div className="absolute -left-10 top-0 w-10 h-10 rounded-lg bg-[#0B1528] border border-cyan-400/40 flex items-center justify-center font-mono text-xs font-semibold text-cyan-300 tabular-nums">
                  {stage.number}
                </div>
                <div className="rounded-xl nexus-surface p-5">
                  <h3 className="font-[Space_Grotesk] text-lg font-bold text-white">
                    {stage.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

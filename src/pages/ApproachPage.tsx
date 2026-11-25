import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageMeta } from '../components/ui/PageMeta';
import { ApproachTimeline } from '../components/approach/ApproachTimeline';
import { FinalCtaSection } from '../components/cta/FinalCtaSection';

const PRINCIPLES = [
  {
    title: 'Clear Scoping Before Code',
    detail: 'Every project starts by defining business objectives, technical boundaries, and realistic milestones before engineering begins.',
  },
  {
    title: 'Security Built Into Delivery',
    detail: 'Authentication, input validation, least-privilege permissions, and backup planning are treated as baseline requirements—never afterthoughts.',
  },
  {
    title: 'Maintainable Documentation',
    detail: 'We hand over clean architecture notes, asset libraries, and operational guidance so your team retains long-term clarity.',
  },
];

export function ApproachPage() {
  return (
    <>
      <PageMeta
        title="Our Approach | NEXUS CORE IT Consulting"
        description="A smarter approach to digital transformation across five structured stages: Discover, Plan, Build, Secure, and Support."
      />

      <section className="pt-32 pb-16 bg-[#060B16] nexus-grid-bg border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-cyan-300 mb-3">Delivery Methodology</p>
          <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-bold text-white max-w-3xl">
            A smarter approach to digital transformation.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Whether we are migrating infrastructure, designing a brand system, or launching custom software, we follow five disciplined stages from discovery to long-term support.
          </p>
        </div>
      </section>

      <ApproachTimeline />

      <section className="py-16 lg:py-24 bg-[#060B16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white">
              Operating Principles
            </h2>
            <Link
              to="/request-a-quote"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              <span>Scope a project with us</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="rounded-2xl nexus-surface p-6">
                <h3 className="font-[Space_Grotesk] text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}

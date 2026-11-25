import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageMeta } from '../components/ui/PageMeta';
import { FinalCtaSection } from '../components/cta/FinalCtaSection';
import { ResilientImage } from '../components/ui/ResilientImage';

const CORE_VALUES = [
  {
    title: 'Clarity Over Complexity',
    detail: 'We communicate technical trade-offs in plain business language so stakeholders make informed decisions.',
  },
  {
    title: 'Security & Reliability',
    detail: 'Resilient systems protect business continuity. We prioritise clean architecture, verified backups, and sound access hygiene.',
  },
  {
    title: 'Craft Across Disciplines',
    detail: 'By uniting infrastructure consulting, engineering, and brand design under one roof, systems and customer experiences stay aligned.',
  },
  {
    title: 'Accountable Partnership',
    detail: 'Editable demonstration overview: replace this copy with your team background and operational milestones when ready.',
  },
];

const WHY_CHOOSE_US = [
  'Single partner spanning IT consulting, support, web engineering, branding, marketing, and software.',
  'Structured five-stage project delivery from initial discovery through ongoing technical support.',
  'Transparent scoping via interactive quote building rather than opaque estimates.',
  'Responsive systems built with modern accessibility and performance standards.',
];

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Us | NEXUS CORE IT Consulting"
        description="Technology with purpose. Solutions with impact. Learn about NEXUS CORE IT Consulting's mission, vision, and values."
      />

      {/* Header */}
      <section className="pt-32 pb-16 bg-[#060B16] nexus-grid-bg border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-sm font-medium text-cyan-300">About NEXUS CORE</p>
            <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-bold text-white">
              Technology with purpose. Solutions with impact.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              NEXUS CORE is an IT consulting and digital solutions business dedicated to helping organisations build dependable infrastructure, modern digital experiences, and resilient operations.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden nexus-surface p-3">
              <ResilientImage
                src="/src/assets/images/service_cloud_nodes_1795525676066.jpg"
                alt="Connected enterprise infrastructure representing NEXUS CORE solutions"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Editable Company Overview, Mission, Vision */}
      <section className="py-16 lg:py-24 bg-[#060B16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="rounded-2xl nexus-surface p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-[Space_Grotesk] text-2xl font-bold text-white">
                Company Overview
              </h2>
              <span className="text-xs text-slate-400">
                Editable company copy · Replace with verified business profile
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-4xl">
              Businesses frequently struggle when IT strategy, day-to-day technical support, web engineering, and brand presentation sit across disconnected vendors. NEXUS CORE brings these essential disciplines together under one structured consulting practice—helping teams simplify operations, modernise customer touchpoints, and safeguard critical systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl nexus-surface p-8 space-y-3">
              <h2 className="font-[Space_Grotesk] text-2xl font-bold text-white">
                Our Mission
              </h2>
              <p className="text-slate-300 leading-relaxed">
                To deliver practical, secure, and well-crafted technology and digital solutions that remove operational friction and move our clients&apos; businesses forward.
              </p>
            </div>

            <div className="rounded-2xl nexus-surface p-8 space-y-3">
              <h2 className="font-[Space_Grotesk] text-2xl font-bold text-white">
                Our Vision
              </h2>
              <p className="text-slate-300 leading-relaxed">
                To be a trusted long-term technology partner known for engineering clarity, dependable support, and measurable business impact.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white mb-6">
              Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CORE_VALUES.map((val) => (
                <div key={val.title} className="rounded-xl nexus-surface p-6">
                  <h3 className="font-[Space_Grotesk] text-lg font-bold text-white">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {val.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="rounded-2xl nexus-surface p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <h2 className="font-[Space_Grotesk] text-2xl font-bold text-white">
                  Why Choose NEXUS CORE
                </h2>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {WHY_CHOOSE_US.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] text-sm font-semibold hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 self-start md:self-center"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}

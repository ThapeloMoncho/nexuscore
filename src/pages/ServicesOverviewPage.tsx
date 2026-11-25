import { PageMeta } from '../components/ui/PageMeta';
import { ServicesSection } from '../components/services/ServicesSection';
import { ApproachTimeline } from '../components/approach/ApproachTimeline';
import { FinalCtaSection } from '../components/cta/FinalCtaSection';

export function ServicesOverviewPage() {
  return (
    <>
      <PageMeta
        title="Services | NEXUS CORE IT Consulting"
        description="Explore NEXUS CORE IT Consulting services: IT consulting, web design and development, computer and IT support, brand identity, digital marketing, and mobile software."
      />

      <section className="pt-32 pb-12 bg-[#060B16] nexus-grid-bg border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-cyan-300 mb-3">Our Capabilities</p>
          <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-bold text-white max-w-3xl">
            Comprehensive IT, Creative and Digital Solutions.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Select individual capabilities or combine multiple disciplines into one cohesive scope. Add any service directly to your project quote.
          </p>
        </div>
      </section>

      <ServicesSection />

      <ApproachTimeline />

      <FinalCtaSection />
    </>
  );
}

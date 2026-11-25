import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Plus } from 'lucide-react';
import { SERVICE_BY_ID } from '../data/services';
import type { ServiceSlug } from '../types/nexus';
import { useQuoteScope } from '../context/QuoteScopeContext';
import { PageMeta } from '../components/ui/PageMeta';
import { ServiceVisual } from '../components/services/ServiceVisuals';
import { FinalCtaSection } from '../components/cta/FinalCtaSection';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? SERVICE_BY_ID[slug as ServiceSlug] : undefined;
  const { isSelected, toggleService, openDrawer } = useQuoteScope();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [visualActive, setVisualActive] = useState(false);

  if (!service) {
    return (
      <section className="pt-36 pb-24 max-w-4xl mx-auto px-4 text-center space-y-5">
        <PageMeta
          title="Service Not Found | NEXUS CORE"
          description="The requested service page could not be found."
        />
        <h1 className="font-[Space_Grotesk] text-3xl font-bold text-white">
          Service Not Found
        </h1>
        <p className="text-slate-300">
          The service you requested does not exist. Browse our six core technology solutions below.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] font-semibold"
        >
          View All Services
        </Link>
      </section>
    );
  }

  const selected = isSelected(service.id);
  const relatedServices = service.relatedIds
    .map((id) => SERVICE_BY_ID[id])
    .filter(Boolean);

  return (
    <>
      <PageMeta
        title={`${service.title} | NEXUS CORE IT Consulting`}
        description={`${service.tagline} ${service.heroSummary}`}
      />

      {/* Cinematic Service Hero */}
      <section className="pt-32 pb-16 lg:pb-24 bg-[#060B16] nexus-grid-bg border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to all services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="font-mono text-sm text-cyan-300 tabular-nums">
                Service {service.number} · NEXUS CORE
              </p>
              <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-bold text-white leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-cyan-200 font-[Space_Grotesk] font-medium">
                {service.tagline}
              </p>
              <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
                {service.heroSummary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => toggleService(service.id)}
                  aria-pressed={selected}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-[Space_Grotesk] text-sm font-semibold transition-colors cursor-pointer ${
                    selected
                      ? 'bg-cyan-400 text-[#04101D] hover:bg-cyan-300'
                      : 'bg-cyan-400 text-[#04101D] hover:bg-cyan-300'
                  }`}
                >
                  {selected ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Added to Quote Scope</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      <span>Add to Quote Scope</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={(e) => openDrawer(e.currentTarget)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-cyan-500/35 bg-[#0A1324] text-slate-100 font-[Space_Grotesk] text-sm font-semibold hover:border-cyan-300 transition-colors cursor-pointer"
                >
                  <span>Build Your Quote</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className="lg:col-span-5"
              onMouseEnter={() => setVisualActive(true)}
              onMouseLeave={() => setVisualActive(false)}
            >
              <div className="rounded-2xl nexus-surface p-5">
                <ServiceVisual
                  serviceId={service.id}
                  imagePath={service.imagePath}
                  imageAlt={service.imageAlt}
                  isHovered={visualActive}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Offerings & Business Benefits */}
      <section className="py-16 lg:py-24 bg-[#060B16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white">
              Individual Offerings
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every engagement is scoped specifically to your operating requirements. Core deliverables within {service.title} include:
            </p>
            <ul className="space-y-3">
              {service.offerings.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-[#0A1222] border border-slate-800/90 px-4 py-3.5 flex items-center gap-3 text-sm text-slate-100"
                >
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white">
              Business Benefits
            </h2>
            <div className="space-y-4">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-xl nexus-surface p-6"
                >
                  <h3 className="font-[Space_Grotesk] text-lg font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {benefit.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific Process Overview */}
      <section className="py-16 lg:py-24 bg-[#080F1E] border-y border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white mb-10">
            Delivery Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((item) => (
              <div key={item.step} className="rounded-xl nexus-surface p-6">
                <span className="font-mono text-xs font-semibold text-cyan-300 tabular-nums">
                  Stage {item.step}
                </span>
                <h3 className="mt-2 font-[Space_Grotesk] text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 lg:py-24 bg-[#060B16]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl nexus-surface overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-[Space_Grotesk] text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-cyan-300 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/70 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[#080F1E] border-t border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[Space_Grotesk] text-2xl font-bold text-white mb-8">
            Related Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.id}
                to={`/services/${rel.id}`}
                className="rounded-xl nexus-surface p-6 nexus-surface-hover block"
              >
                <span className="font-mono text-xs text-cyan-300 tabular-nums">
                  Service {rel.number}
                </span>
                <h3 className="mt-2 font-[Space_Grotesk] text-lg font-bold text-white">
                  {rel.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-300">{rel.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                  Explore service <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}

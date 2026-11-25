import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Check } from 'lucide-react';
import { useQuoteScope } from '../../context/QuoteScopeContext';
import { SERVICE_BY_ID } from '../../data/services';
import { ResilientImage } from '../ui/ResilientImage';

export function FinalCtaSection() {
  const { selectedServices, openDrawer } = useQuoteScope();

  return (
    <section className="relative py-20 lg:py-28 bg-[#060B16] overflow-hidden border-t border-slate-800/70">
      {/* Subtle Landscape Backdrop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <ResilientImage
          src="/src/assets/images/hero_infrastructure_1795525674840.jpg"
          alt="Cinematic technology horizon with subtle network trails"
          loading="lazy"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B16] via-[#060B16]/90 to-[#060B16]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left CTA Copy */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl font-bold text-white">
              Let&apos;s Build Your Next Digital Solution.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Choose the services you need and request a tailored quote. Our team is ready to help.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/request-a-quote"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] text-sm sm:text-base font-semibold hover:bg-cyan-300 transition-colors shadow-[0_0_24px_rgba(34,211,238,0.25)] whitespace-nowrap"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-cyan-500/30 bg-[#0A1324]/80 text-slate-100 font-[Space_Grotesk] text-sm sm:text-base font-semibold hover:border-cyan-300 transition-colors whitespace-nowrap"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>
          </div>

          {/* Right Project Scope Summary Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl nexus-surface p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <h3 className="font-[Space_Grotesk] text-base font-semibold text-white">
                    Your Project Scope
                  </h3>
                </div>
                <span className="font-mono text-xs text-cyan-300 tabular-nums">
                  {selectedServices.length} selected
                </span>
              </div>

              {selectedServices.length === 0 ? (
                <p className="text-sm text-slate-400 leading-relaxed">
                  No services added yet. Use Add to Quote on any solution card or start your multi-step quote directly.
                </p>
              ) : (
                <ul className="space-y-2">
                  {selectedServices.map((id) => {
                    const service = SERVICE_BY_ID[id];
                    if (!service) return null;
                    return (
                      <li
                        key={id}
                        className="flex items-center gap-2.5 text-sm text-slate-200"
                      >
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                        <span>{service.title}</span>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={(e) => openDrawer(e.currentTarget)}
                  className="text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
                >
                  Open scope drawer
                </button>
                <Link
                  to="/request-a-quote"
                  className="text-xs font-semibold text-slate-100 hover:text-cyan-300 transition-colors"
                >
                  Continue to Quote →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

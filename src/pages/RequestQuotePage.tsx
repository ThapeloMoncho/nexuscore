import { PageMeta } from '../components/ui/PageMeta';
import { QuoteBuilder } from '../components/quote-builder/QuoteBuilder';

export function RequestQuotePage() {
  return (
    <>
      <PageMeta
        title="Request a Quote | NEXUS CORE IT Consulting"
        description="Build your tailored project quote across IT consulting, web development, IT support, brand identity, digital marketing, and software solutions."
      />

      <section className="pt-32 pb-12 bg-[#060B16] nexus-grid-bg border-b border-slate-800/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-cyan-300 mb-3">Interactive Quote Builder</p>
          <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-bold text-white">
            Scope Your Project in Four Steps.
          </h1>
          <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Select your required services, outline your objectives, and receive a unique quote reference number.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-[#060B16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteBuilder />
        </div>
      </section>
    </>
  );
}

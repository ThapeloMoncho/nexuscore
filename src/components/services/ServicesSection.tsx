import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { ServiceCard } from './ServiceCard';

export function ServicesSection({ showViewAll = false }: { showViewAll?: boolean }) {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#060B16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl font-bold text-white">
              Six Solutions. One Partner.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore our core services, designed to solve your unique challenges and create lasting value.
            </p>
          </div>

          {showViewAll && (
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Compare all services</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* 3-col desktop, 2-col tablet, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Globe,
  Laptop,
  Layers,
  Plus,
  Server,
  Smartphone,
  TrendingUp,
} from 'lucide-react';
import type { ServiceItem } from '../../types/nexus';
import { useQuoteScope } from '../../context/QuoteScopeContext';
import { ServiceVisual } from './ServiceVisuals';

const ICON_MAP = {
  Server,
  Globe,
  Laptop,
  Layers,
  TrendingUp,
  Smartphone,
} as const;

export function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isSelected, toggleService } = useQuoteScope();
  const selected = isSelected(service.id);
  const Icon = ICON_MAP[service.iconName];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group rounded-2xl nexus-surface p-6 flex flex-col justify-between transition-all duration-200 ${
        selected
          ? 'border-cyan-400/60 shadow-[0_0_32px_rgba(34,211,238,0.12)]'
          : 'hover:border-cyan-400/35'
      }`}
    >
      <div>
        {/* Service Number & Icon Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="font-mono text-xs font-medium text-cyan-300 tabular-nums">
            Service {service.number}
          </span>
          <div className="w-9 h-9 rounded-lg bg-[#070E1C] border border-cyan-500/20 flex items-center justify-center text-cyan-300">
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>

        {/* Animated Service Visual */}
        <ServiceVisual
          serviceId={service.id}
          imagePath={service.imagePath}
          imageAlt={service.imageAlt}
          isHovered={isHovered}
        />

        {/* Title & Description */}
        <h3 className="mt-5 font-[Space_Grotesk] text-xl font-bold text-white">
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          {service.description}
        </p>

        {/* Offerings List */}
        <ul className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-sm text-slate-300">
          {service.offerings.map((offering) => (
            <li key={offering} className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" aria-hidden="true" />
              <span>{offering}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <Link
          to={`/services/${service.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors whitespace-nowrap"
        >
          <span>Learn More</span>
          <ArrowRight
            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>

        <button
          type="button"
          onClick={() => toggleService(service.id)}
          aria-pressed={selected}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-[Space_Grotesk] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            selected
              ? 'bg-cyan-400 text-[#04101D] hover:bg-cyan-300'
              : 'bg-[#081122] border border-cyan-500/30 text-slate-100 hover:border-cyan-300 hover:bg-cyan-500/10'
          }`}
        >
          {selected ? (
            <>
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Added to Quote</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Add to Quote</span>
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}

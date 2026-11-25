import { motion } from 'motion/react';
import type { ServiceSlug } from '../../types/nexus';
import { ResilientImage } from '../ui/ResilientImage';

interface ServiceVisualProps {
  serviceId: ServiceSlug;
  imagePath: string;
  imageAlt: string;
  isHovered: boolean;
}

export function ServiceVisual({ serviceId, imagePath, imageAlt, isHovered }: ServiceVisualProps) {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden bg-[#050A14] border border-slate-800/90">
      <ResilientImage
        src={imagePath}
        alt={imageAlt}
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-500 ${
          isHovered ? 'scale-105 opacity-45' : 'scale-100 opacity-35'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060B16] via-[#060B16]/55 to-transparent" />

      {/* Service-Specific Interactive Motion Overlay */}
      <div className="absolute inset-0 p-4 flex items-center justify-center pointer-events-none">
        {serviceId === 'it-consulting' && <ConsultingNodesOverlay active={isHovered} />}
        {serviceId === 'web-development' && <WebWireframeOverlay active={isHovered} />}
        {serviceId === 'it-support' && <SupportScannerOverlay active={isHovered} />}
        {serviceId === 'brand-identity' && <BrandGeometryOverlay active={isHovered} />}
        {serviceId === 'digital-marketing' && <MarketingChartOverlay active={isHovered} />}
        {serviceId === 'mobile-software' && <MobileModulesOverlay active={isHovered} />}
      </div>
    </div>
  );
}

function ConsultingNodesOverlay({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 120" className="w-full h-full max-w-[230px]" aria-hidden="true">
      <motion.path
        d="M35 88 L95 36 L155 76 L208 30 M95 36 L148 26 L208 30 M35 88 L155 76"
        fill="none"
        stroke="#22D3EE"
        strokeWidth="1.5"
        initial={{ pathLength: 0.65, opacity: 0.55 }}
        animate={{ pathLength: active ? 1 : 0.78, opacity: active ? 1 : 0.65 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      />
      {[
        { x: 35, y: 88 },
        { x: 95, y: 36 },
        { x: 148, y: 26 },
        { x: 155, y: 76 },
        { x: 208, y: 30 },
      ].map((pt, i) => (
        <motion.g
          key={i}
          animate={{ scale: active ? 1.12 : 1 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
        >
          <circle cx={pt.x} cy={pt.y} r="10" fill="rgba(34,211,238,0.14)" />
          <circle cx={pt.x} cy={pt.y} r="4.5" fill="#0B1324" stroke="#22D3EE" strokeWidth="1.75" />
        </motion.g>
      ))}
    </svg>
  );
}

function WebWireframeOverlay({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[220px] flex items-end justify-center gap-2.5">
      {/* Desktop Wireframe -> UI */}
      <motion.div
        animate={{ y: active ? -3 : 0 }}
        transition={{ duration: 0.35 }}
        className="w-36 h-24 rounded-lg bg-[#081224]/90 border border-cyan-400/40 p-2 flex flex-col gap-1.5"
      >
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-8 rounded bg-cyan-400/80" />
          <div className="flex gap-1">
            <span className="h-1 w-3 rounded bg-slate-600" />
            <span className="h-1 w-3 rounded bg-slate-600" />
          </div>
        </div>
        <motion.div
          animate={{ opacity: active ? 1 : 0.65 }}
          className="h-7 rounded bg-gradient-to-r from-cyan-500/30 to-blue-500/20 border border-cyan-400/30"
        />
        <div className="grid grid-cols-3 gap-1 flex-1">
          <div className="rounded bg-slate-800/90 border border-slate-700/60" />
          <div className="rounded bg-slate-800/90 border border-slate-700/60" />
          <div className="rounded bg-slate-800/90 border border-slate-700/60" />
        </div>
      </motion.div>

      {/* Mobile Screen */}
      <motion.div
        animate={{ y: active ? -6 : 0 }}
        transition={{ duration: 0.4 }}
        className="w-12 h-20 rounded-lg bg-[#091529]/95 border border-cyan-300/50 p-1.5 flex flex-col gap-1"
      >
        <div className="h-1 w-4 mx-auto rounded bg-slate-600" />
        <div className="h-5 rounded bg-cyan-500/25 border border-cyan-400/30" />
        <div className="flex-1 rounded bg-slate-800/90" />
      </motion.div>
    </div>
  );
}

function SupportScannerOverlay({ active }: { active: boolean }) {
  return (
    <div className="relative w-full max-w-[220px] h-28 rounded-lg bg-[#071121]/90 border border-cyan-500/30 p-3 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
        <span>SYSTEM DIAGNOSTICS</span>
        <span className="text-cyan-300">{active ? 'VERIFIED' : 'READY'}</span>
      </div>

      <div className="space-y-1.5">
        {['CPU & Thermals', 'Storage Integrity', 'OS & Security'].map((label, idx) => (
          <div key={label} className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300">{label}</span>
            <motion.span
              animate={{ opacity: active ? 1 : 0.7 }}
              transition={{ delay: idx * 0.08 }}
              className="font-mono text-cyan-300"
            >
              OK
            </motion.span>
          </div>
        ))}
      </div>

      {/* Horizontal Cyan Scanning Beam */}
      <motion.div
        animate={{ y: active ? [-8, 96, -8] : [10, 76, 10] }}
        transition={{ duration: active ? 1.8 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 top-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.95)]"
      />
    </div>
  );
}

function BrandGeometryOverlay({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-4">
      {/* Assembling Geometric Logo */}
      <svg viewBox="0 0 80 80" className="w-20 h-20" aria-hidden="true">
        <motion.polygon
          points="40,8 70,25 70,55 40,72 10,55 10,25"
          fill="#091326"
          stroke="#22D3EE"
          strokeWidth="2"
          animate={{ rotate: active ? 30 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: '40px', originY: '40px' }}
        />
        <motion.path
          d="M27 52 V28 L53 52 V28"
          fill="none"
          stroke="#F8FAFC"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ pathLength: active ? 1 : 0.85 }}
          transition={{ duration: 0.45 }}
        />
      </svg>

      {/* Palette & Stationery Swatches */}
      <div className="space-y-1.5">
        <motion.div
          animate={{ x: active ? 0 : -4 }}
          className="w-24 h-4 rounded bg-[#0F1B33] border border-cyan-400/40"
        />
        <motion.div
          animate={{ x: active ? 4 : 0 }}
          className="w-24 h-4 rounded bg-cyan-400/80"
        />
        <motion.div
          animate={{ x: active ? 0 : -2 }}
          className="w-20 h-4 rounded bg-slate-200/90"
        />
      </div>
    </div>
  );
}

function MarketingChartOverlay({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[225px] rounded-lg bg-[#071121]/90 border border-cyan-500/30 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium text-slate-300">Campaign Reach</span>
        <span className="font-mono text-[11px] text-cyan-300">Active Growth</span>
      </div>
      <svg viewBox="0 0 200 64" className="w-full h-14" aria-hidden="true">
        <path d="M0 56 H200 M0 32 H200" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
        <motion.path
          d="M8 52 L48 42 L88 46 L128 24 L164 28 L194 10"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.55 }}
          animate={{ pathLength: active ? 1 : 0.72 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}

function MobileModulesOverlay({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2.5">
      <motion.div
        animate={{ x: active ? -4 : 0 }}
        transition={{ duration: 0.35 }}
        className="w-16 h-24 rounded-lg bg-[#081224]/90 border border-slate-700 p-2 flex flex-col justify-between"
      >
        <div className="h-2 w-8 rounded bg-cyan-400/70" />
        <div className="space-y-1">
          <div className="h-2 rounded bg-slate-700" />
          <div className="h-2 rounded bg-slate-700 w-3/4" />
        </div>
        <div className="h-4 rounded bg-cyan-500/20 border border-cyan-400/30" />
      </motion.div>

      <motion.div
        animate={{ y: active ? -5 : 0 }}
        transition={{ duration: 0.35 }}
        className="w-16 h-28 rounded-xl bg-[#0B172C]/95 border border-cyan-400/50 p-2 flex flex-col justify-between shadow-[0_0_20px_rgba(34,211,238,0.2)]"
      >
        <div className="h-1.5 w-6 mx-auto rounded bg-slate-600" />
        <div className="h-9 rounded bg-cyan-400/25 border border-cyan-400/40" />
        <div className="space-y-1">
          <div className="h-2 rounded bg-slate-700" />
          <div className="h-2 rounded bg-cyan-400/60 w-2/3" />
        </div>
      </motion.div>

      <motion.div
        animate={{ x: active ? 4 : 0 }}
        transition={{ duration: 0.35 }}
        className="w-16 h-24 rounded-lg bg-[#081224]/90 border border-slate-700 p-2 flex flex-col justify-between"
      >
        <div className="h-2 w-8 rounded bg-blue-400/70" />
        <div className="space-y-1">
          <div className="h-2 rounded bg-slate-700" />
          <div className="h-2 rounded bg-slate-700 w-4/5" />
        </div>
        <div className="h-4 rounded bg-slate-800" />
      </motion.div>
    </div>
  );
}

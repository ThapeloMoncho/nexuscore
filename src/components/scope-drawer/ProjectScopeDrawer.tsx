import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Briefcase, Trash2, X } from 'lucide-react';
import { useQuoteScope } from '../../context/QuoteScopeContext';
import { SERVICE_BY_ID } from '../../data/services';

export function ProjectScopeDrawer() {
  const {
    selectedServices,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    removeService,
    clearServices,
  } = useQuoteScope();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(frame);
    };
  }, [isDrawerOpen, closeDrawer]);

  const handleContinueToQuote = () => {
    closeDrawer();
    navigate('/request-a-quote');
  };

  // Hide floating trigger on /request-a-quote so the builder remains cleanly uncluttered
  const showFloatingTrigger = location.pathname !== '/request-a-quote';

  return (
    <>
      {showFloatingTrigger && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
          <button
            type="button"
            onClick={(e) => openDrawer(e.currentTarget)}
            aria-label={`Build Your Quote, ${selectedServices.length} services selected`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#0B1426]/95 backdrop-blur-xl border border-cyan-400/40 text-slate-100 shadow-[0_12px_36px_rgba(0,0,0,0.6)] hover:border-cyan-300 hover:bg-[#101C34] transition-all cursor-pointer whitespace-nowrap"
          >
            <Briefcase className="w-4 h-4 text-cyan-300 shrink-0" aria-hidden="true" />
            <span className="font-[Space_Grotesk] text-sm font-semibold">Build Your Quote</span>
            <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-md bg-cyan-400 text-[#04101D] font-mono text-xs font-bold tabular-nums">
              {selectedServices.length}
            </span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {isDrawerOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-labelledby="scope-drawer-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Right Slide-in Panel (full-height on mobile) */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full sm:max-w-md h-full bg-[#081020] border-l border-cyan-500/20 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between gap-4">
                <div>
                  <h2
                    id="scope-drawer-title"
                    className="font-[Space_Grotesk] text-lg font-semibold text-white"
                  >
                    Project Scope
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5 tabular-nums">
                    {selectedServices.length}{' '}
                    {selectedServices.length === 1 ? 'service selected' : 'services selected'}
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close project scope drawer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {selectedServices.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                      <Briefcase className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                    </div>
                    <h3 className="font-[Space_Grotesk] text-base font-semibold text-slate-100">
                      Your project scope is empty
                    </h3>
                    <p className="mt-2 text-sm text-slate-400 max-w-xs leading-relaxed">
                      Add one or more NEXUS CORE services from our solutions cards to build a tailored quote request.
                    </p>
                    <Link
                      to="/services"
                      onClick={closeDrawer}
                      className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-cyan-500/30 text-cyan-300 text-sm font-medium hover:bg-cyan-500/10 transition-colors"
                    >
                      Explore Services
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-3" aria-label="Selected services">
                    {selectedServices.map((serviceId) => {
                      const service = SERVICE_BY_ID[serviceId];
                      if (!service) return null;
                      return (
                        <li
                          key={service.id}
                          className="rounded-xl bg-[#0D172B] border border-slate-800/90 p-4 flex items-start justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-cyan-400 tabular-nums">
                                {service.number}
                              </span>
                              <span className="font-[Space_Grotesk] text-sm font-semibold text-slate-100">
                                {service.title}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                              {service.tagline}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeService(service.id)}
                            aria-label={`Remove ${service.title} from scope`}
                            className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="px-6 py-5 border-t border-slate-800/80 bg-[#060C18] space-y-3">
                {selectedServices.length > 0 && (
                  <button
                    type="button"
                    onClick={clearServices}
                    className="w-full py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    Clear all selected services
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleContinueToQuote}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] text-sm font-semibold hover:bg-cyan-300 transition-colors cursor-pointer"
                >
                  <span>Continue to Quote</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

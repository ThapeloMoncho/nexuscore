import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { SERVICES } from '../../data/services';

export function NexusLogoMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M14 2L25 8.3V19.7L14 26L3 19.7V8.3L14 2Z"
        stroke="#22D3EE"
        strokeWidth="1.75"
      />
      <path
        d="M9.5 19V9L18.5 19V9"
        stroke="#F1F5F9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Our Approach', to: '/approach' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isServicesActive = location.pathname.startsWith('/services');

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#060B16]/90 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-6">
        {/* Left: NEXUS CORE Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-slate-100 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
          aria-label="NEXUS CORE Home"
        >
          <NexusLogoMark />
          <span className="font-[Space_Grotesk] text-lg font-bold tracking-tight">
            NEXUS CORE
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                Home
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </>
            )}
          </NavLink>

          {/* Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              onClick={() => setServicesOpen((prev) => !prev)}
              className={`relative flex items-center gap-1 py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isServicesActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180 text-cyan-300' : ''
                }`}
                aria-hidden="true"
              />
              {isServicesActive && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-cyan-400 rounded-full" />
              )}
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  role="menu"
                  aria-label="Services menu"
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[540px] rounded-xl bg-[#0A1222]/98 backdrop-blur-2xl border border-cyan-500/20 shadow-[0_24px_60px_rgba(0,0,0,0.65)] p-4"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                    <span className="text-xs font-medium text-slate-400">
                      Six Integrated Technology Solutions
                    </span>
                    <Link
                      to="/services"
                      role="menuitem"
                      className="text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      View all services
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.id}`}
                        role="menuitem"
                        className="group rounded-lg p-3 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-cyan-400 tabular-nums">
                            {service.number}
                          </span>
                          <span className="font-[Space_Grotesk] text-sm font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors">
                            {service.title}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                          {service.tagline}
                        </p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.slice(1).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                  isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right: Primary Action + Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/request-a-quote"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] text-sm font-semibold hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-[0_0_24px_rgba(34,211,238,0.25)]"
          >
            Request a Quote
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-700/80 text-slate-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            aria-label="Mobile navigation"
            className="lg:hidden bg-[#060B16]/98 backdrop-blur-xl border-b border-cyan-500/20 px-4 pt-3 pb-6 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                Home
              </NavLink>

              <div>
                <button
                  type="button"
                  aria-expanded={mobileServicesExpanded}
                  onClick={() => setMobileServicesExpanded((prev) => !prev)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isServicesActive
                      ? 'bg-cyan-500/10 text-cyan-300'
                      : 'text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileServicesExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileServicesExpanded && (
                  <div className="mt-1 ml-3 pl-3 border-l border-slate-800 space-y-1">
                    <Link
                      to="/services"
                      className="block px-3 py-2 text-sm text-cyan-300 font-medium"
                    >
                      All Services Overview
                    </Link>
                    {SERVICES.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.id}`}
                        className="block px-3 py-2 text-sm text-slate-300 hover:text-white"
                      >
                        {service.number}. {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {NAV_LINKS.slice(1).map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="pt-3">
                <Link
                  to="/request-a-quote"
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] text-base font-semibold hover:bg-cyan-300 transition-colors"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

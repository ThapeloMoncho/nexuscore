import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { SITE_CONFIG } from '../../data/siteConfig';
import { NexusLogoMark } from '../navigation/Navbar';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#040811] border-t border-slate-800/80 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-slate-100 hover:text-cyan-300 transition-colors"
            >
              <NexusLogoMark />
              <span className="font-[Space_Grotesk] text-lg font-bold tracking-tight">
                {SITE_CONFIG.brandName}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {SITE_CONFIG.shortDescription}
            </p>
            <p className="font-[Space_Grotesk] text-sm font-medium text-cyan-300">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-[Space_Grotesk] text-sm font-semibold text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/approach" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/request-a-quote" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-[Space_Grotesk] text-sm font-semibold text-white mb-4">
              Core Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Editable Contact & Social Placeholders */}
          <div>
            <h3 className="font-[Space_Grotesk] text-sm font-semibold text-white mb-4">
              Contact Details
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{SITE_CONFIG.contact.emailPlaceholder}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{SITE_CONFIG.contact.phonePlaceholder}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>WhatsApp: {SITE_CONFIG.contact.whatsappPlaceholder}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{SITE_CONFIG.contact.locationPlaceholder}</span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              {SITE_CONFIG.contact.isPlaceholderNotice}
            </p>
            <div className="mt-5 flex items-center gap-4 text-xs text-slate-400">
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 transition-colors"
              >
                LinkedIn
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 transition-colors"
              >
                GitHub
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={SITE_CONFIG.socials.x}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 transition-colors"
              >
                X
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {year} NEXUS CORE IT Consulting. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

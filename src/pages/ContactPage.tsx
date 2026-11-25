import { Clock, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { PageMeta } from '../components/ui/PageMeta';
import { ContactForm } from '../components/forms/ContactForm';
import { SITE_CONFIG } from '../data/siteConfig';

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact Us | NEXUS CORE IT Consulting"
        description="Let's start a conversation. Contact NEXUS CORE IT Consulting for infrastructure advice, web development, IT support, branding, or software enquiries."
      />

      <section className="pt-32 pb-12 bg-[#060B16] nexus-grid-bg border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-cyan-300 mb-3">Contact NEXUS CORE</p>
          <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-bold text-white max-w-3xl">
            Let&apos;s start a conversation.
          </h1>
          <p className="mt-4 text-base text-slate-300 max-w-2xl leading-relaxed">
            Have a question about our IT consulting, support, or digital capabilities? Send us a message and our team will respond promptly.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#060B16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Editable Contact Placeholders */}
          <aside className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl nexus-surface p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-[Space_Grotesk] text-xl font-bold text-white">
                  Direct Channels
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {SITE_CONFIG.contact.isPlaceholderNotice}
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-slate-100 font-medium">{SITE_CONFIG.contact.emailPlaceholder}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-400">Telephone</p>
                    <p className="text-slate-100 font-medium">{SITE_CONFIG.contact.phonePlaceholder}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MessageSquare className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-400">WhatsApp</p>
                    <a
                      href={SITE_CONFIG.contact.whatsappHrefPlaceholder}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
                    >
                      {SITE_CONFIG.contact.whatsappPlaceholder}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-400">Service Region</p>
                    <p className="text-slate-100 font-medium">{SITE_CONFIG.contact.locationPlaceholder}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-400">Business Hours</p>
                    <p className="text-slate-100 font-medium">{SITE_CONFIG.contact.businessHoursPlaceholder}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

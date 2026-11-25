import { PageMeta } from '../components/ui/PageMeta';
import { SITE_CONFIG } from '../data/siteConfig';

export function PrivacyPolicyPage() {
  return (
    <section className="pt-32 pb-24 bg-[#060B16]">
      <PageMeta
        title="Privacy Policy | NEXUS CORE IT Consulting"
        description="Privacy policy and data handling principles for NEXUS CORE IT Consulting."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <p className="text-sm font-medium text-cyan-300">Legal · Editable Policy Template</p>
        <h1 className="font-[Space_Grotesk] text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="text-sm text-slate-400">
          Review and customise this placeholder policy with your legal advisor prior to launch.
        </p>

        <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-[Space_Grotesk] text-xl font-bold text-white">
              1. Information We Collect
            </h2>
            <p>
              When you submit a contact enquiry or request a project quote through NEXUS CORE IT Consulting, we collect only the contact and project scope details you voluntarily enter in those forms (such as name, business email, phone number, company name, and project description).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-[Space_Grotesk] text-xl font-bold text-white">
              2. How Information Is Used
            </h2>
            <p>
              Submitted information is used exclusively to review your enquiry, prepare requested project proposals, and communicate with you via your chosen contact method. We do not sell or rent client contact data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-[Space_Grotesk] text-xl font-bold text-white">
              3. Data Storage &amp; Security
            </h2>
            <p>
              Form submissions are validated server-side and stored in access-restricted database tables protected by Row Level Security. Local browser storage is used solely to preserve your selected services in the Project Scope Drawer during navigation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-[Space_Grotesk] text-xl font-bold text-white">
              4. Contact Regarding Privacy
            </h2>
            <p>
              To request updates or deletion of submitted enquiries, contact us at{' '}
              <span className="text-cyan-300">{SITE_CONFIG.contact.emailPlaceholder}</span>.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

export function TermsPage() {
  return (
    <section className="pt-32 pb-24 bg-[#060B16]">
      <PageMeta
        title="Terms and Conditions | NEXUS CORE IT Consulting"
        description="Terms and conditions governing website use and project enquiries for NEXUS CORE IT Consulting."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <p className="text-sm font-medium text-cyan-300">Legal · Editable Terms Template</p>
        <h1 className="font-[Space_Grotesk] text-4xl font-bold text-white">
          Terms and Conditions
        </h1>
        <p className="text-sm text-slate-400">
          Review and customise these placeholder terms with your legal advisor prior to launch.
        </p>

        <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-[Space_Grotesk] text-xl font-bold text-white">
              1. Website Scope &amp; Quotations
            </h2>
            <p>
              Submitting a quote request through the NEXUS CORE website generates a project scope reference for discussion and proposal preparation. Formal engagements commence only once a written scope of work and service agreement are approved by both parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-[Space_Grotesk] text-xl font-bold text-white">
              2. Sample Content &amp; Intellectual Property
            </h2>
            <p>
              Demonstration articles and sample portfolio concepts presented on this site illustrate service capabilities and may be updated without notice. All NEXUS CORE branding, graphics, and source layouts remain the property of NEXUS CORE IT Consulting unless otherwise agreed in writing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-[Space_Grotesk] text-xl font-bold text-white">
              3. Acceptable Use
            </h2>
            <p>
              Automated abuse, scraping, or spam submissions to contact and quote endpoints are prohibited and actively mitigated through rate limiting and request validation.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

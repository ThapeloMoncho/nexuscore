import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { contactSchema, type ContactFormValues } from '../../lib/validation/schemas';

interface ContactStatus {
  state: 'idle' | 'success' | 'config_required' | 'error';
  message?: string;
  missingVariables?: string[];
}

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactStatus>({ state: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      serviceInterest: 'General Enquiry',
      message: '',
      website: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitting(true);
    setStatus({ state: 'idle' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setStatus({
          state: 'success',
          message: data.message || 'Your enquiry has been received.',
        });
        reset();
      } else if (data.code === 'CONFIGURATION_REQUIRED') {
        setStatus({
          state: 'config_required',
          message: data.message,
          missingVariables: Array.isArray(data.missing) ? data.missing : [],
        });
      } else {
        setStatus({
          state: 'error',
          message: data.message || 'Unable to send your message. Please verify your entries.',
        });
      }
    } catch {
      setStatus({
        state: 'error',
        message: 'Network error while sending your enquiry. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl nexus-surface p-6 sm:p-8 space-y-5"
    >
      {/* Honeypot anti-spam field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-fullName" className="block text-sm font-medium text-slate-200 mb-1.5">
            Full name *
          </label>
          <input
            id="contact-fullName"
            type="text"
            autoComplete="name"
            {...register('fullName')}
            className="w-full rounded-lg bg-[#060B16] border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-300">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-200 mb-1.5">
            Email address *
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className="w-full rounded-lg bg-[#060B16] border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-300">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-200 mb-1.5">
            Phone number *
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+27 ..."
            {...register('phone')}
            className="w-full rounded-lg bg-[#060B16] border border-slate-700 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-300">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-serviceInterest" className="block text-sm font-medium text-slate-200 mb-1.5">
            Service of interest *
          </label>
          <select
            id="contact-serviceInterest"
            {...register('serviceInterest')}
            className="w-full rounded-lg bg-[#060B16] border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400"
          >
            <option value="General Enquiry">General Enquiry</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
          {errors.serviceInterest && (
            <p className="mt-1 text-xs text-rose-300">{errors.serviceInterest.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-200 mb-1.5">
          Subject *
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="How can our team help?"
          {...register('subject')}
          className="w-full rounded-lg bg-[#060B16] border border-slate-700 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400"
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-rose-300">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-200 mb-1.5">
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Share your requirements, timeline, or questions..."
          {...register('message')}
          className="w-full rounded-lg bg-[#060B16] border border-slate-700 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-rose-300">{errors.message.message}</p>
        )}
      </div>

      {status.state === 'success' && (
        <div
          role="status"
          className="rounded-xl bg-cyan-500/12 border border-cyan-400/40 p-4 text-sm text-cyan-100 flex items-start gap-2.5"
        >
          <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{status.message}</span>
        </div>
      )}

      {status.state === 'config_required' && (
        <div
          role="alert"
          className="rounded-xl bg-amber-500/10 border border-amber-400/40 p-4 text-sm text-amber-100 space-y-1.5"
        >
          <div className="flex items-center gap-2 font-semibold text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Integration Configuration Required</span>
          </div>
          <p className="text-amber-100/90 leading-relaxed">{status.message}</p>
          {status.missingVariables && status.missingVariables.length > 0 && (
            <p className="font-mono text-xs text-amber-200">
              Missing: {status.missingVariables.join(', ')}
            </p>
          )}
        </div>
      )}

      {status.state === 'error' && (
        <div
          role="alert"
          className="rounded-xl bg-rose-500/10 border border-rose-400/40 p-4 text-sm text-rose-200 flex items-start gap-2.5"
        >
          <AlertTriangle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{status.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] text-sm font-semibold hover:bg-cyan-300 disabled:opacity-60 transition-colors cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Sending Enquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}

import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { INSIGHT_ARTICLES } from '../data/insights';
import { PageMeta } from '../components/ui/PageMeta';
import { ResilientImage } from '../components/ui/ResilientImage';
import { FinalCtaSection } from '../components/cta/FinalCtaSection';

export function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = INSIGHT_ARTICLES.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="pt-36 pb-24 max-w-3xl mx-auto px-4 text-center space-y-5">
        <PageMeta
          title="Article Not Found | NEXUS CORE"
          description="The requested insight article could not be found."
        />
        <h1 className="font-[Space_Grotesk] text-3xl font-bold text-white">
          Article Not Found
        </h1>
        <p className="text-slate-300">
          Return to our Insights archive to browse all available articles.
        </p>
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] font-semibold"
        >
          Back to Insights
        </Link>
      </section>
    );
  }

  return (
    <>
      <PageMeta
        title={`${article.title} | NEXUS CORE Insights`}
        description={article.excerpt}
      />

      <article className="pt-32 pb-20 bg-[#060B16]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to all insights</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4">
            <span className="text-cyan-300 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>Editable demonstration article</span>
          </div>

          <h1 className="font-[Space_Grotesk] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {article.title}
          </h1>

          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="mt-8 rounded-2xl overflow-hidden nexus-surface p-2">
            <ResilientImage
              src={article.imagePath}
              alt={article.imageAlt}
              className="w-full h-64 sm:h-80 object-cover rounded-xl"
            />
          </div>

          <div className="mt-10 space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="font-[Space_Grotesk] text-2xl font-bold text-white">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-base text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/insights"
              className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors"
            >
              ← Browse more articles
            </Link>
            <Link
              to="/request-a-quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] text-sm font-semibold hover:bg-cyan-300 transition-colors"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>

      <FinalCtaSection />
    </>
  );
}

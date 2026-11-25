import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { INSIGHT_ARTICLES } from '../data/insights';
import type { InsightCategory } from '../types/nexus';
import { PageMeta } from '../components/ui/PageMeta';
import { ResilientImage } from '../components/ui/ResilientImage';
import { FinalCtaSection } from '../components/cta/FinalCtaSection';

const CATEGORIES: ('All' | InsightCategory)[] = [
  'All',
  'Technology',
  'IT Support',
  'Cybersecurity',
  'Web Development',
  'Digital Marketing',
  'Business Innovation',
];

export function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | InsightCategory>('All');

  const featuredArticle = INSIGHT_ARTICLES.find((a) => a.featured) || INSIGHT_ARTICLES[0];
  const filteredArticles =
    activeCategory === 'All'
      ? INSIGHT_ARTICLES
      : INSIGHT_ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <>
      <PageMeta
        title="Insights | NEXUS CORE IT Consulting"
        description="Articles and practical guides covering technology strategy, IT support, cybersecurity, web development, digital marketing, and business innovation."
      />

      <section className="pt-32 pb-12 bg-[#060B16] nexus-grid-bg border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-cyan-300 mb-3">Insights &amp; Guides</p>
          <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-bold text-white max-w-3xl">
            Technology Perspectives for Business Leaders.
          </h1>
          <p className="mt-4 text-base text-slate-300 max-w-2xl leading-relaxed">
            Editable demonstration articles covering infrastructure, security, engineering, and digital growth.
          </p>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter insight articles by category"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-400 text-[#04101D] font-semibold'
                      : 'bg-[#0A1324] border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#060B16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Featured Article (shown when All is active) */}
          {activeCategory === 'All' && featuredArticle && (
            <article className="rounded-2xl nexus-surface overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 h-64 lg:h-auto bg-[#050A14]">
                <ResilientImage
                  src={featuredArticle.imagePath}
                  alt={featuredArticle.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="text-cyan-300 font-semibold">Featured Article</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredArticle.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredArticle.readingTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredArticle.publishedAt}</span>
                  </div>
                  <h2 className="mt-3 font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white">
                    <Link
                      to={`/insights/${featuredArticle.slug}`}
                      className="hover:text-cyan-300 transition-colors"
                    >
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-800/70 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">Editable demonstration article</span>
                  <Link
                    to={`/insights/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <span>Read featured article</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="rounded-2xl nexus-surface overflow-hidden flex flex-col justify-between nexus-surface-hover"
              >
                <div>
                  <div className="h-44 bg-[#050A14]">
                    <ResilientImage
                      src={article.imagePath}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="text-cyan-300 font-medium">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readingTime}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.publishedAt}</span>
                    </div>
                    <h3 className="mt-2.5 font-[Space_Grotesk] text-lg font-bold text-white">
                      <Link
                        to={`/insights/${article.slug}`}
                        className="hover:text-cyan-300 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-slate-800/70 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Demo content</span>
                  <Link
                    to={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <span>Read article</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}

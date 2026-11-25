import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageMeta } from '../components/ui/PageMeta';
import { HeroSection } from '../components/hero/HeroSection';
import { ServicesSection } from '../components/services/ServicesSection';
import { ApproachTimeline } from '../components/approach/ApproachTimeline';
import { FinalCtaSection } from '../components/cta/FinalCtaSection';
import { SAMPLE_PROJECTS } from '../data/projects';
import { INSIGHT_ARTICLES } from '../data/insights';
import { ResilientImage } from '../components/ui/ResilientImage';

export function HomePage() {
  const featuredProjects = SAMPLE_PROJECTS.slice(0, 3);
  const recentInsights = INSIGHT_ARTICLES.slice(0, 3);

  return (
    <>
      <PageMeta
        title="NEXUS CORE IT Consulting | Innovate. Secure. Grow."
        description="Technology that moves your business forward. Explore comprehensive IT consulting, web development, IT support, brand identity, digital marketing, and mobile software solutions."
      />

      <HeroSection />

      <ServicesSection showViewAll />

      <ApproachTimeline />

      {/* Selected Sample Architecture & Projects Preview */}
      <section className="py-20 lg:py-24 bg-[#060B16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-medium text-cyan-300 mb-2">Portfolio Showcase</p>
              <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl font-bold text-white">
                Sample Solution Blueprints
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Editable sample engagements illustrating our technical and creative capabilities.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors whitespace-nowrap"
            >
              <span>View all projects</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl nexus-surface overflow-hidden flex flex-col justify-between nexus-surface-hover"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-[#050A14]">
                    <ResilientImage
                      src={project.imagePath}
                      alt={project.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-cyan-300 font-medium">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Sample Case</span>
                    </div>
                    <h3 className="mt-2 font-[Space_Grotesk] text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-slate-800/70">
                  <Link
                    to={`/projects?highlight=${project.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <span>View project</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Preview */}
      <section className="py-16 lg:py-24 bg-[#080F1E] border-t border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-medium text-cyan-300 mb-2">Insights &amp; Guides</p>
              <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl font-bold text-white">
                Practical Perspectives
              </h2>
            </div>
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors whitespace-nowrap"
            >
              <span>Browse all insights</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentInsights.map((article) => (
              <article
                key={article.slug}
                className="rounded-2xl nexus-surface p-6 flex flex-col justify-between nexus-surface-hover"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-cyan-300 font-medium">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedAt}</span>
                  </div>
                  <h3 className="mt-3 font-[Space_Grotesk] text-lg font-bold text-white">
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
                <div className="mt-5 pt-4 border-t border-slate-800/70">
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

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, X } from 'lucide-react';
import { SAMPLE_PROJECTS } from '../data/projects';
import type { ProjectCategory, ProjectItem } from '../types/nexus';
import { PageMeta } from '../components/ui/PageMeta';
import { ResilientImage } from '../components/ui/ResilientImage';
import { FinalCtaSection } from '../components/cta/FinalCtaSection';

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Web development',
  'IT infrastructure',
  'Branding',
  'Digital marketing',
  'Software solutions',
];

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const highlight = searchParams.get('highlight');
    if (highlight) {
      const found = SAMPLE_PROJECTS.find((p) => p.id === highlight);
      if (found) setSelectedProject(found);
    }
  }, [searchParams]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? SAMPLE_PROJECTS
      : SAMPLE_PROJECTS.filter((p) => p.category === activeCategory);

  const openProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setSearchParams({ highlight: project.id });
  };

  const closeProject = () => {
    setSelectedProject(null);
    setSearchParams({});
  };

  return (
    <>
      <PageMeta
        title="Projects & Portfolio | NEXUS CORE IT Consulting"
        description="Explore sample NEXUS CORE solution blueprints across web development, IT infrastructure, branding, digital marketing, and software solutions."
      />

      <section className="pt-32 pb-12 bg-[#060B16] nexus-grid-bg border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-cyan-300 mb-3">Projects &amp; Blueprints</p>
          <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl font-bold text-white max-w-3xl">
            Solutions Engineered for Real Operations.
          </h1>
          <p className="mt-4 text-base text-slate-300 max-w-2xl leading-relaxed">
            Below are clearly labelled sample projects demonstrating our architecture, design, and delivery capabilities until live client case studies are published.
          </p>

          {/* Interactive Category Filter */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl nexus-surface overflow-hidden flex flex-col justify-between nexus-surface-hover"
              >
                <div>
                  <div className="h-52 overflow-hidden bg-[#050A14]">
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
                      <span>Sample Project</span>
                    </div>
                    <h2 className="mt-2 font-[Space_Grotesk] text-xl font-bold text-white">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-4 border-t border-slate-800/70">
                  <button
                    type="button"
                    onClick={() => openProject(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
                  >
                    <span>View project</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Accessible Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProject}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#091224] border border-cyan-500/25 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-56 bg-[#050A14]">
                <ResilientImage
                  src={selectedProject.imagePath}
                  alt={selectedProject.imageAlt}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={closeProject}
                  aria-label="Close project details"
                  className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-[#060B16]/85 border border-slate-700 text-slate-200 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-cyan-300 font-medium">{selectedProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.architectureNote}</span>
                </div>
                <h2
                  id="project-modal-title"
                  className="font-[Space_Grotesk] text-2xl font-bold text-white"
                >
                  {selectedProject.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.summary}
                </p>

                <div>
                  <h3 className="font-[Space_Grotesk] text-sm font-semibold text-white mb-3">
                    Scope &amp; Deliverables
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-slate-200 bg-[#060C18] border border-slate-800 rounded-lg px-3 py-2"
                      >
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={closeProject}
                    className="text-sm text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    Close
                  </button>
                  <Link
                    to="/request-a-quote"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 text-[#04101D] font-[Space_Grotesk] text-sm font-semibold hover:bg-cyan-300 transition-colors"
                  >
                    <span>Request Similar Solution</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FinalCtaSection />
    </>
  );
}

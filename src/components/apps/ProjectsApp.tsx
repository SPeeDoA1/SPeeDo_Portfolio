import { projects } from '@/data/projects';
import type { ProjectEntry } from '@/types/content';

function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <div className="border rounded p-4 hover:bg-blue-50 transition-colors">
      <h3 className="font-bold">{project.title}</h3>
      <p className="text-sm text-gray-600">{project.description}</p>
      {project.longDescription && (
        <p className="text-sm text-gray-500 mt-1">{project.longDescription}</p>
      )}
      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tech.map((tech) => (
            <span key={tech} className="text-xs bg-blue-100 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
      )}
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-2">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectsApp() {
  const featured = projects.filter((p) => p.category === 'featured');
  const earlier = projects.filter((p) => p.category === 'earlier');

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
          Featured / Production Projects
        </h2>
        <div className="grid gap-4">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
          Earlier Projects / Experiments
        </h2>
        <div className="grid gap-4">
          {earlier.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

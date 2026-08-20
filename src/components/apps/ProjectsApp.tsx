import { projects } from '@/data/projects';

export default function ProjectsApp() {
  return (
    <div className="p-4 grid gap-4">
      {projects.map((project) => (
        <div key={project.title} className="border rounded p-4 hover:bg-blue-50 transition-colors">
          <h3 className="font-bold">{project.title}</h3>
          <p className="text-sm text-gray-600">{project.description}</p>
          <div className="flex gap-2 mt-2">
            {project.tech.map((tech) => (
              <span key={tech} className="text-xs bg-blue-100 px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

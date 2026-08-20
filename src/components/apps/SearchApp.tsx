import { useMemo, useState } from 'react';
import { skillCategories } from '@/data/skills';
import { projects } from '@/data/projects';
import { experience } from '@/data/experience';
import { useWindowManager } from '@/context/WindowManagerContext';
import { applications } from '@/lib/applications';

interface SearchResult {
  label: string;
  appId: string;
}

export default function SearchApp() {
  const { openWindow } = useWindowManager();
  const [query, setQuery] = useState('');

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: SearchResult[] = [];
    skillCategories.forEach((cat) => {
      cat.skills.forEach((skill) => {
        if (skill.toLowerCase().includes(q)) out.push({ label: `Skills\\${skill}`, appId: 'my_skills' });
      });
    });
    projects.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
        out.push({ label: `Projects\\${p.title}`, appId: 'my_projects' });
      }
    });
    experience.forEach((e) => {
      if (e.organization.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q)) {
        out.push({ label: `Experience\\${e.organization}`, appId: 'experience' });
      }
    });
    return out;
  }, [query]);

  return (
    <div className="p-4 space-y-3">
      <h2 className="font-bold text-sm">Search Companion</h2>
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for..."
        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
      />
      <div className="space-y-1">
        {query && results.length === 0 && <p className="text-xs text-gray-400">No results found.</p>}
        {results.map((r) => (
          <button
            key={r.label}
            onClick={() => {
              const app = applications[r.appId];
              if (app) openWindow(app.id, app.defaultSize);
            }}
            className="w-full text-left text-sm text-blue-700 hover:underline px-1 py-0.5"
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

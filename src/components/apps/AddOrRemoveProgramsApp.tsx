import { useState } from 'react';

const PROGRAMS = [
  { name: 'React Native', category: 'Used frequently' },
  { name: 'Next.js', category: 'Used frequently' },
  { name: 'Django', category: 'Used frequently' },
  { name: 'Convex', category: 'Used frequently' },
  { name: 'Docker', category: 'Used frequently' },
  { name: 'Python', category: 'Used frequently' },
  { name: 'TypeScript', category: 'Used frequently' },
  { name: 'Burp Suite', category: 'Security tooling' },
  { name: 'Nmap', category: 'Security tooling' },
  { name: 'Figma', category: 'Design tooling' },
  { name: 'Photoshop', category: 'Design tooling' },
];

export default function AddOrRemoveProgramsApp() {
  const [selected, setSelected] = useState<string | null>(null);
  const [notice, setNotice] = useState(false);

  return (
    <div className="flex h-full text-sm">
      <div className="flex-1 overflow-auto">
        {PROGRAMS.map((program) => (
          <button
            key={program.name}
            onClick={() => {
              setSelected(program.name);
              setNotice(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 border-b border-gray-100 text-left ${
              selected === program.name ? 'bg-blue-100' : 'hover:bg-blue-50'
            }`}
          >
            <span>{program.name}</span>
            <span className="text-xs text-gray-500">{program.category}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="w-44 border-l border-gray-200 p-3 space-y-2">
          <p className="font-bold text-xs">{selected}</p>
          <button onClick={() => setNotice(true)} className="w-full text-xs xp-button px-2 py-1 rounded-sm">
            Remove
          </button>
          {notice && (
            <p className="text-xs text-red-600">
              Windows cannot remove this skill. It is currently required by Ali.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

import { profile } from '@/data/profile';

const CONNECTIONS = [
  { label: 'GitHub', status: 'Connected', href: profile.github },
  { label: 'LinkedIn', status: 'Connected', href: profile.linkedin },
  { label: 'Ninuva Infrastructure', status: 'Connected', href: profile.ninuva.main },
  { label: 'TryHackMe', status: 'Connected' },
];

export default function NetworkConnectionsApp() {
  return (
    <div className="p-4 space-y-2">
      <h2 className="font-bold text-sm mb-2">Network Connections</h2>
      {CONNECTIONS.map((c) => (
        <div key={c.label} className="flex items-center justify-between border rounded px-3 py-2">
          <button
            onClick={() => c.href && window.open(c.href, '_blank', 'noopener,noreferrer')}
            disabled={!c.href}
            className={`text-sm ${c.href ? 'text-blue-700 hover:underline' : ''}`}
          >
            {c.label}
          </button>
          <span className="text-xs text-green-700 font-bold">{c.status}</span>
        </div>
      ))}
    </div>
  );
}

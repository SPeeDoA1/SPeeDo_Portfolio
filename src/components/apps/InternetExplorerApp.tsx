import { useState } from 'react';
import { profile } from '@/data/profile';

const HOME = 'about:home';

const FAVORITES = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'Ninuva', href: profile.ninuva.main },
];

export default function InternetExplorerApp() {
  const [address, setAddress] = useState(HOME);
  const [visited, setVisited] = useState<string | null>(null);

  const go = (url: string) => {
    if (url === HOME) {
      setAddress(HOME);
      setVisited(null);
      return;
    }
    setAddress(url);
    setVisited(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full text-sm">
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-[#ECE9D8]">
        <button onClick={() => go(HOME)} className="xp-button px-2 py-1 text-xs rounded-sm">
          Home
        </button>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && go(address)}
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs"
        />
        <button onClick={() => go(address)} className="xp-button px-3 py-1 text-xs rounded-sm">
          Go
        </button>
      </div>
      <div className="flex gap-3 px-2 py-1 border-b border-gray-100 bg-[#F7F6F1]">
        {FAVORITES.map((fav) => (
          <button key={fav.label} onClick={() => go(fav.href)} className="text-xs text-blue-700 hover:underline">
            {fav.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-6">
        {address === HOME ? (
          <div className="space-y-2 text-center">
            <h2 className="font-bold text-lg">{profile.name}</h2>
            <p className="text-sm text-gray-600">
              {profile.title} · {profile.secondaryTitle}
            </p>
            <p className="text-xs text-gray-400">Use the Favorites bar above to visit GitHub, LinkedIn, or Ninuva.</p>
          </div>
        ) : (
          <p className="text-xs text-gray-400">Opened {visited} in a new tab.</p>
        )}
      </div>
      <div className="border-t border-gray-200 bg-[#ECE9D8] px-2 py-1 text-[10px] text-gray-500">Done</div>
    </div>
  );
}

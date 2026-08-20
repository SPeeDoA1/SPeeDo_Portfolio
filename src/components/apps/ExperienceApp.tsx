import Image from 'next/image';
import { experience } from '@/data/experience';

export default function ExperienceApp() {
  return (
    <div className="p-4 space-y-4">
      {experience.map((entry) => (
        <div key={entry.id} className="border rounded p-4">
          <div className="flex items-center gap-3 mb-2">
            <Image src="/icons/documents.png" alt="" width={28} height={28} className="pixelated" draggable={false} />
            <div>
              <h3 className="font-bold">{entry.organization}</h3>
              <p className="text-xs text-gray-500">{entry.role} · {entry.period}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">{entry.summary}</p>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
            {entry.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

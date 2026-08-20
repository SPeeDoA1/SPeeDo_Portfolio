import Image from 'next/image';
import { profile } from '@/data/profile';

export default function ResumeApp() {
  return (
    <div className="p-6 flex flex-col items-center text-center gap-4">
      <Image src="/icons/documents.png" alt="" width={48} height={48} className="pixelated" draggable={false} />
      <div>
        <h2 className="font-bold">Resume.pdf</h2>
        <p className="text-sm text-gray-600">{profile.name} — {profile.title}</p>
      </div>
      <div className="flex gap-3">
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline px-3 py-1 border rounded"
        >
          Open
        </a>
        <a
          href="/Resume.pdf"
          download
          className="text-sm text-blue-600 hover:underline px-3 py-1 border rounded"
        >
          Download
        </a>
      </div>
      <p className="text-xs text-gray-400">
        The full document. For a summary, see About, Experience, Projects, and Skills.
      </p>
    </div>
  );
}

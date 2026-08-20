import { useState } from 'react';
import { profile } from '@/data/profile';
import { education } from '@/data/education';
import { languages } from '@/data/languages';

const TABS = ['General', 'Computer Name', 'Hardware', 'Advanced'] as const;
type Tab = (typeof TABS)[number];

export default function SystemPropertiesApp() {
  const [tab, setTab] = useState<Tab>('General');

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-gray-300 bg-[#ECE9D8]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs border-r border-gray-300 ${
              tab === t ? 'bg-white font-bold' : 'hover:bg-white/60'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-4 flex-1 overflow-auto text-sm space-y-4">
        {tab === 'General' && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="font-bold">SPeeDo</h2>
              <p className="text-xs text-gray-500">Professional Portfolio</p>
            </div>
            <div>
              <h3 className="font-bold text-xs uppercase text-gray-500 mb-1">System</h3>
              <p>{profile.name}</p>
              <p>{profile.title}</p>
              <p>{profile.secondaryTitle}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Professional Edition</p>
              <p>Founder &amp; Lead Developer</p>
              <p>Ninuva</p>
            </div>
            <div>
              <h3 className="font-bold text-xs uppercase text-gray-500 mb-1">Technical Profile</h3>
              <ul className="grid grid-cols-2 gap-x-4">
                <li>React Native</li>
                <li>Next.js</li>
                <li>Django</li>
                <li>Convex</li>
                <li>Docker</li>
                <li>Python</li>
                <li>TypeScript</li>
                <li>Cybersecurity</li>
              </ul>
            </div>
          </div>
        )}
        {tab === 'Computer Name' && (
          <div className="space-y-2">
            <p><span className="text-gray-500">Computer description:</span> Ali&apos;s Portfolio</p>
            <p><span className="text-gray-500">Full computer name:</span> SPEEDO-PC</p>
            <p><span className="text-gray-500">Workgroup:</span> NINUVA</p>
          </div>
        )}
        {tab === 'Hardware' && (
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase text-gray-500 mb-1">Education</h3>
            <p>{education.institution}</p>
            <p>{education.degree}</p>
            <p>{education.department}</p>
            <p>{education.status} · Expected {education.expectedGraduation}</p>
          </div>
        )}
        {tab === 'Advanced' && (
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase text-gray-500 mb-1">Languages</h3>
            {languages.map((lang) => (
              <p key={lang.name}>
                <span className="text-gray-500">{lang.name}:</span> {lang.proficiency}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

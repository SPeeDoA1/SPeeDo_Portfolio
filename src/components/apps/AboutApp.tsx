import { Code, Mail } from 'lucide-react';
import { profile } from '@/data/profile';
import { aboutContent } from '@/data/about';

export default function AboutApp() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold">{aboutContent.heading}</h2>
      <h3 className="text-md">{aboutContent.subheading}</h3>
      <p className="text-sm">
        {aboutContent.bioParagraphs.join(' ')}
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{profile.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          <span className="text-sm"><p> {aboutContent.quote} </p></span>
        </div>
      </div>
    </div>
  );
}

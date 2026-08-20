import Image from 'next/image';
import { achievements } from '@/data/achievements';

export default function AchievementsApp() {
  return (
    <div className="p-4 grid gap-3">
      {achievements.map((achievement) => (
        <div key={achievement.title + achievement.description} className="flex items-center gap-3 border rounded p-3">
          <Image src="/icons/Certificate.png" alt="" width={32} height={32} className="pixelated" draggable={false} />
          <div>
            <h3 className="font-bold text-sm">{achievement.title}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

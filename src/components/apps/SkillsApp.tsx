import { skillCategories } from '@/data/skills';

export default function SkillsApp() {
  return (
    <div className="p-6 space-y-6">
      {skillCategories.map((group) => (
        <div key={group.category}>
          <h3 className="font-bold mb-2">{group.category}</h3>
          <div className="grid grid-cols-2 gap-2">
            {group.skills.map((skill) => (
              <div key={skill} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

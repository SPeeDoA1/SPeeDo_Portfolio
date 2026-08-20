import Image from 'next/image';
import { profile } from '@/data/profile';
import { education } from '@/data/education';
import { useWindowManager } from '@/context/WindowManagerContext';
import { applications } from '@/lib/applications';

function TaskPaneLink({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left text-xs text-blue-700 hover:underline flex items-center gap-2 py-1"
    >
      <Image src={icon} alt="" width={16} height={16} className="pixelated" draggable={false} />
      {label}
    </button>
  );
}

const FILE_ITEMS = [
  { id: 'my_documents', label: "Ali's Documents", icon: '/icons/documents.png' },
  { id: 'my_projects', label: 'Projects', icon: '/icons/projects.png' },
  { id: 'certifications', label: 'Certificates', icon: '/icons/Certificate.png' },
  { id: 'achievements', label: 'Achievements', icon: '/icons/Certificate.png' },
];

export default function MyComputerApp() {
  const { openWindow } = useWindowManager();

  const open = (id: string) => {
    const app = applications[id];
    if (app) openWindow(app.id, app.defaultSize);
  };

  return (
    <div className="flex h-full text-sm">
      {/* Left task pane */}
      <div className="w-48 bg-[#D3E5FA] p-3 space-y-4 overflow-auto shrink-0">
        <div>
          <h3 className="text-xs font-bold text-[#1E5799] mb-1">System Tasks</h3>
          <TaskPaneLink icon="/icons/my_computer.png" label="View system information" onClick={() => open('system_properties')} />
          <TaskPaneLink icon="/icons/documents.png" label="Add or remove programs" onClick={() => open('add_remove_programs')} />
          <TaskPaneLink icon="/icons/skills.png" label="Change a setting" onClick={() => open('control_panel')} />
        </div>
        <div>
          <h3 className="text-xs font-bold text-[#1E5799] mb-1">Other Places</h3>
          <TaskPaneLink icon="/icons/documents.png" label="My Documents" onClick={() => open('my_documents')} />
          <TaskPaneLink icon="/icons/projects.png" label="My Projects" onClick={() => open('my_projects')} />
          <TaskPaneLink icon="/icons/skills.png" label="Control Panel" onClick={() => open('control_panel')} />
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 p-4 overflow-auto space-y-6">
        <div>
          <h3 className="font-bold text-xs uppercase text-gray-500 mb-2">Files Stored on This Computer</h3>
          <div className="grid grid-cols-4 gap-4">
            {FILE_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => open(item.id)}
                className="flex flex-col items-center gap-1 p-2 rounded hover:bg-blue-50"
              >
                <Image src={item.icon} alt="" width={40} height={40} className="pixelated" draggable={false} />
                <span className="text-xs text-center">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xs uppercase text-gray-500 mb-2">System Information</h3>
          <div className="font-mono text-xs bg-white border border-gray-200 rounded p-3 space-y-2">
            <p><span className="text-gray-500">Computer:</span> SPEEDO-PC</p>
            <p><span className="text-gray-500">Operating System:</span> {profile.title} / {profile.secondaryTitle}</p>
            <p><span className="text-gray-500">Education:</span> {education.degree}</p>
            <p><span className="text-gray-500">Status:</span> {education.status}</p>
            <p><span className="text-gray-500">Primary Stack:</span> Next.js / React Native / Django / Convex</p>
            <p><span className="text-gray-500">Security:</span> eJPTv2 / PT1 / Red &amp; Blue Teaming</p>
            <p><span className="text-gray-500">Location:</span> {profile.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

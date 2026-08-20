import React from 'react';
import Image from 'next/image';
import { profile } from '@/data/profile';
import { applicationList } from '@/lib/applications';
import { useWindowManager } from '@/context/WindowManagerContext';

interface StartMenuProps {
  onItemSelected: () => void;
}

export default function StartMenu({ onItemSelected }: StartMenuProps) {
  const { openWindow } = useWindowManager();

  return (
    <div
      className="absolute bottom-10 left-0 z-50 w-80 bg-white rounded-t-lg
                shadow-2xl start-menu origin-bottom"
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      {/* User Profile Section */}
      <div className="h-20 bg-gradient-to-r from-[#1E5799] to-[#2989D8] p-4
                     rounded-t-lg flex items-center gap-4">
        <Image
          src="/icons/user.png"
          alt="Start"
          width={60}
          height={60}
          className="pixelated rounded-full"
          draggable={false}
        />
        <span className="text-white font-bold">{profile.name} ({profile.handle})</span>
      </div>
      {/* Programs Section */}
      <div className="flex h-[400px]">
        {/* Left Column - Main Programs */}
        <div className="w-3/5 p-2 space-y-1 bg-white">
          {applicationList.map((app) => (
            <button
              key={app.id}
              className="w-full flex items-center gap-3 p-2 rounded hover:bg-[#2989D8]
                       hover:text-white transition-colors"
              onClick={() => {
                openWindow(app.id, app.defaultSize);
                onItemSelected();
              }}
            >
              <Image
                src={app.icon}
                alt={app.title}
                width={24}
                height={24}
                className="w-6 h-6 pixelated"
                draggable={false}
              />
              <span className="text-sm text-left">{app.title}</span>
            </button>
          ))}
        </div>

        {/* Right Column - Recent Programs */}
        <div className="w-2/5 bg-[#EFF3F7] p-2 space-y-1">
          <div className="text-sm font-bold text-gray-600 mb-2 px-2">Recent</div>
          <div className="space-y-1">
            <button className="w-full text-left text-sm p-2 hover:bg-[#2989D8] hover:text-white rounded">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/recent.png"
                  alt="Start"
                  width={24}
                  height={24}
                  className="pixelated"
                  draggable={false}
                />
                <span>Recent Projects</span>
              </div>
            </button>
            <button className="w-full text-left text-sm p-2 hover:bg-[#2989D8] hover:text-white rounded">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/documents.png"
                  alt="Start"
                  width={24}
                  height={24}
                  className="pixelated"
                  draggable={false}
                />
                <span>My Documents</span>
              </div>
            </button>
            <button className="w-full text-left text-sm p-2 hover:bg-[#2989D8] hover:text-white rounded">
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/pictures.png"
                  alt="Start"
                  width={24}
                  height={24}
                  className="pixelated"
                  draggable={false}
                />
                <span>My Pictures</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 bg-[#EFF3F7] p-2">
        <div className="flex justify-between">
          <button className="flex items-center gap-2 p-2 hover:bg-[#2989D8] hover:text-white rounded">
            <Image
              src="/icons/logoff.png"
              alt="Start"
              width={24}
              height={24}
              className="pixelated"
              draggable={false}
            />
            <span className="text-sm">Log Off</span>
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-[#2989D8] hover:text-white rounded">
            <Image
              src="/icons/shutdown.png"
              alt="Start"
              width={24}
              height={24}
              className="pixelated"
              draggable={false}
            />
            <span className="text-sm">Shut Down</span>
          </button>
        </div>
      </div>
    </div>
  );
}

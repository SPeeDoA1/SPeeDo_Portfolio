import React from 'react';
import Window from './Window';
import { applications } from '@/lib/applications';
import { useWindowManager } from '@/context/WindowManagerContext';

export default function WindowManager() {
  const {
    openWindows,
    activeWindow,
    windowPositions,
    windowSizes,
    isMaximized,
    minimizedWindows,
    closeWindow,
    minimizeWindow,
    focusWindow,
    toggleMaximizeWindow,
    moveWindow,
    resizeWindow,
  } = useWindowManager();

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {openWindows.map((id, index) => {
        const app = applications[id];
        if (!app || minimizedWindows.includes(id)) return null;
        const AppComponent = app.component;

        return (
          <div key={id} className="pointer-events-auto">
            <Window
              title={app.title}
              icon={app.icon}
              zIndex={100 + index}
              isActive={activeWindow === id}
              position={windowPositions[id] || { x: 0, y: 0 }}
              onPositionChange={(newPos) => moveWindow(id, newPos)}
              size={windowSizes[id] || app.defaultSize || { width: 600, height: 400 }}
              onSizeChange={(newSize) => resizeWindow(id, newSize)}
              isMaximized={!!isMaximized[id]}
              onClose={() => closeWindow(id)}
              onMinimize={() => minimizeWindow(id)}
              onMaximize={() => toggleMaximizeWindow(id)}
              onFocus={() => focusWindow(id)}
            >
              <AppComponent />
            </Window>
          </div>
        );
      })}
    </div>
  );
}

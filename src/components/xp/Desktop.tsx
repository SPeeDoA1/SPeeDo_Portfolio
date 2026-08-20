import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DesktopIcon from './DesktopIcon';
import ContextMenu, { type ContextMenuItem } from './ContextMenu';
import Dialog from './Dialog';
import { applications, desktopApplicationList } from '@/lib/applications';
import { useWindowManager } from '@/context/WindowManagerContext';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import { getDefaultIconPosition } from '@/lib/desktopLayout';
import type { Position } from '@/types/window';

type MenuState = { x: number; y: number; targetId?: string } | null;

export default function Desktop() {
  const { openWindow } = useWindowManager();
  const [positions, setPositions] = useState<Record<string, Position>>(() =>
    loadFromStorage(STORAGE_KEYS.desktopIconPositions, {})
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [menu, setMenu] = useState<MenuState>(null);
  const [properties, setProperties] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => saveToStorage(STORAGE_KEYS.desktopIconPositions, positions), 400);
    return () => clearTimeout(timeout);
  }, [positions]);

  const getPosition = (id: string, index: number): Position => positions[id] ?? getDefaultIconPosition(index);

  const moveIcon = (id: string, position: Position) => {
    setPositions((prev) => ({ ...prev, [id]: position }));
  };

  const open = (id: string) => {
    const app = desktopApplicationList.find((a) => a.id === id);
    if (app) openWindow(app.id, app.defaultSize);
  };

  const lineUpIcons = () => setPositions({});

  const desktopMenuItems: ContextMenuItem[] = [
    { label: 'Line Up Icons', onClick: lineUpIcons },
    { label: 'Refresh' },
    { separator: true, label: '' },
    { label: 'Paste', disabled: true },
    { label: 'Paste Shortcut', disabled: true },
    { separator: true, label: '' },
    {
      label: 'Properties',
      onClick: () => openWindow('display_properties', applications.display_properties.defaultSize),
    },
  ];

  const iconMenuItems = (id: string): ContextMenuItem[] => {
    const app = desktopApplicationList.find((a) => a.id === id);
    return [
      { label: 'Open', onClick: () => open(id) },
      { label: 'Explore', onClick: () => open(id) },
      { separator: true, label: '' },
      { label: 'Create Shortcut', disabled: true },
      { separator: true, label: '' },
      {
        label: 'Properties',
        onClick: () =>
          setProperties({
            title: `${app?.title ?? id} Properties`,
            message: `Type: Application\nLocation: C:\\Portfolio\\${app?.title ?? id}\nOpens: ${app?.title ?? id} window`,
          }),
      },
    ];
  };

  return (
    <>
      <Image
        src="/bg.jpg"
        alt="Windows XP Background"
        fill
        className="object-cover"
        priority
        quality={100}
        draggable={false}
        unoptimized
      />
      <div
        className="absolute inset-0 z-10"
        onMouseDown={() => setSelectedId(null)}
        onContextMenu={(e) => {
          e.preventDefault();
          setSelectedId(null);
          setMenu({ x: e.clientX, y: e.clientY });
        }}
      >
        {desktopApplicationList.map((app, index) => (
          <DesktopIcon
            key={app.id}
            title={app.title}
            iconSrc={app.icon}
            position={getPosition(app.id, index)}
            onPositionChange={(pos) => moveIcon(app.id, pos)}
            isSelected={selectedId === app.id}
            onSelect={() => setSelectedId(app.id)}
            onOpen={() => open(app.id)}
            onContextMenu={(e) => setMenu({ x: e.clientX, y: e.clientY, targetId: app.id })}
          />
        ))}
      </div>

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          items={menu.targetId ? iconMenuItems(menu.targetId) : desktopMenuItems}
          onClose={() => setMenu(null)}
        />
      )}

      {properties && (
        <Dialog
          title={properties.title}
          message={properties.message}
          variant="info"
          onClose={() => setProperties(null)}
        />
      )}
    </>
  );
}

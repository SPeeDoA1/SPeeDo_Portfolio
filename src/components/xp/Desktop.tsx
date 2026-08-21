import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DesktopIcon from './DesktopIcon';
import ContextMenu, { type ContextMenuItem } from './ContextMenu';
import Dialog from './Dialog';
import { applications, desktopApplicationList } from '@/lib/applications';
import { useWindowManager } from '@/context/WindowManagerContext';
import { useRecycleBin } from '@/context/RecycleBinContext';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import { getDefaultIconPosition } from '@/lib/desktopLayout';
import { playRecycle } from '@/lib/sound';
import type { Position } from '@/types/window';

type MenuState = { x: number; y: number; targetId?: string } | null;

export default function Desktop() {
  const { openWindow } = useWindowManager();
  const { deletedIds, deleteApp } = useRecycleBin();
  const visibleApps = desktopApplicationList.filter((app) => !deletedIds.includes(app.id));
  // Starts empty on both server and first client render (so hydration always
  // matches), then hydrated from localStorage in an effect after mount.
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [menu, setMenu] = useState<MenuState>(null);
  const [properties, setProperties] = useState<{ title: string; message: string } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadFromStorage<Record<string, Position>>(STORAGE_KEYS.desktopIconPositions, {});
    if (Object.keys(saved).length > 0) setPositions(saved);
  }, []);

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
    const canDelete = id !== 'recycle_bin';
    return [
      { label: 'Open', onClick: () => open(id) },
      { label: 'Explore', onClick: () => open(id) },
      { separator: true, label: '' },
      { label: 'Create Shortcut', disabled: true },
      canDelete
        ? { label: 'Delete', onClick: () => setConfirmDeleteId(id) }
        : { label: 'Delete', disabled: true },
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
        {visibleApps.map((app, index) => (
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

      {confirmDeleteId && (
        <Dialog
          title="Confirm File Delete"
          variant="question"
          message={`Are you sure you want to send '${
            desktopApplicationList.find((a) => a.id === confirmDeleteId)?.title ?? confirmDeleteId
          }' to the Recycle Bin?`}
          confirmLabel="Yes"
          cancelLabel="No"
          onConfirm={() => {
            deleteApp(confirmDeleteId);
            playRecycle();
          }}
          onClose={() => setConfirmDeleteId(null)}
        />
      )}
    </>
  );
}

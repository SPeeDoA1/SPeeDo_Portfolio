import { themeList } from '@/data/themes';
import { useTheme } from '@/context/ThemeContext';

export default function DisplayPropertiesApp() {
  const { themeId, setThemeId } = useTheme();

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="font-bold text-sm mb-1">Display Properties</h2>
        <p className="text-xs text-gray-500">Choose a Windows and buttons color scheme.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {themeList.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setThemeId(theme.id)}
            className={`text-left border rounded overflow-hidden transition-colors ${
              themeId === theme.id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="h-6" style={{ background: theme.titlebarActiveGradient }} />
            <div className="p-2 flex items-center justify-between bg-white">
              <span className="text-xs">{theme.name}</span>
              {themeId === theme.id && <span className="text-[10px] text-blue-600 font-bold">Active</span>}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400">
        The selected scheme applies to the taskbar, window title bars, and Start Menu, and is remembered on this device.
      </p>
    </div>
  );
}

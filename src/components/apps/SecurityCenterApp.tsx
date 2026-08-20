const STATUSES = [
  { label: 'Firewall', value: 'ON' },
  { label: 'Automatic Updates', value: 'ON' },
  { label: 'Security Skills', value: 'ON' },
];

const PROFILE = [
  'Penetration Testing',
  'Red Teaming',
  'Blue Teaming',
  'Active Directory',
  'Digital Forensics',
  'Network Security',
];

export default function SecurityCenterApp() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-sm">SPeeDo Security Center</h2>
      <div className="space-y-2">
        {STATUSES.map((s) => (
          <div key={s.label} className="flex items-center justify-between border border-green-200 rounded px-3 py-2 bg-green-50">
            <span className="text-sm">{s.label}</span>
            <span className="text-xs font-bold text-green-700">{s.value}</span>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Security Profile</h3>
        <div className="grid grid-cols-2 gap-2">
          {PROFILE.map((item) => (
            <div key={item} className="text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

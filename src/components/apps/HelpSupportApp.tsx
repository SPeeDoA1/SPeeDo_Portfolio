const TOPICS = [
  { q: 'Who is Ali?', a: 'A full-stack software engineer and final-year cybersecurity student. See About Me for the full story.' },
  { q: 'How do I view projects?', a: 'Double-click "My Projects" on the desktop, or open Start → My Projects.' },
  { q: 'How do I contact Ali?', a: 'Open the Contact application for email, phone, GitHub, and LinkedIn.' },
  { q: 'How do I download the resume?', a: 'Open the Resume application from My Documents or the Start Menu.' },
  { q: 'What Command Prompt commands are available?', a: 'Open Command Prompt and type "help" for the full list.' },
  {
    q: 'What keyboard shortcuts are available?',
    a: 'Win opens the Start Menu, Win+R opens Run, Escape closes menus, Enter opens the selected icon.',
  },
];

export default function HelpSupportApp() {
  return (
    <div className="p-4 space-y-3">
      <h2 className="font-bold text-sm">Help and Support Center</h2>
      {TOPICS.map((topic) => (
        <div key={topic.q} className="border-b border-gray-100 pb-2">
          <p className="text-sm font-bold text-blue-700">{topic.q}</p>
          <p className="text-xs text-gray-600">{topic.a}</p>
        </div>
      ))}
    </div>
  );
}

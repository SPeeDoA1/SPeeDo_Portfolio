import Image from 'next/image';
import { contactLinks, contactInfo } from '@/data/contact';

export default function ContactApp() {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-6">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 border rounded hover:bg-blue-50 transition-colors"
          >
            <Image
              src={link.icon}
              alt="Start"
              width={60}
              height={60}
              className="pixelated"
              draggable={false}
            />
            <span className="text-sm text-blue-600">{link.label}</span>
          </a>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="font-bold mb-2">Contact Information</h3>
        <div className="space-y-2 text-sm">
          {contactInfo.emails.map((email) => (
            <p key={email}>📧 {email}</p>
          ))}
          {contactInfo.phones.map((phone) => (
            <p key={phone}>📱 {phone}</p>
          ))}
          <p>📍 {contactInfo.location}</p>
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';
import { certifications } from '@/data/certifications';

export default function CertificationsApp() {
  return (
    <div className="p-4 grid gap-3">
      {certifications.map((cert) => (
        <div key={cert.name} className="flex items-center gap-3 border rounded p-3">
          <Image src="/icons/Certificate.png" alt="" width={40} height={40} className="pixelated" draggable={false} />
          <div>
            <h3 className="font-bold text-sm">{cert.name}</h3>
            <p className="text-xs text-gray-500">Issuer: {cert.issuer}</p>
            <p className="text-xs text-gray-500">Status: {cert.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

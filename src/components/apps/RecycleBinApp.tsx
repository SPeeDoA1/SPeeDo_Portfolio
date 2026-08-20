import Image from 'next/image';

const ITEMS = [
  { name: 'deprecated_framework.exe', size: '4.2 MB' },
  { name: 'sleep_schedule.txt', size: '0 KB' },
  { name: 'bugs_final_final_v2.zip', size: '512 KB' },
];

export default function RecycleBinApp() {
  return (
    <div className="p-4">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-200">
            <th className="font-normal py-1">Name</th>
            <th className="font-normal py-1">Size</th>
          </tr>
        </thead>
        <tbody>
          {ITEMS.map((item) => (
            <tr key={item.name} className="border-b border-gray-100 hover:bg-blue-50">
              <td className="py-1.5 flex items-center gap-2">
                <Image src="/icons/recycle_bin.png" alt="" width={16} height={16} className="pixelated" draggable={false} />
                {item.name}
              </td>
              <td className="py-1.5 text-gray-500">{item.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

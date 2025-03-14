import { Table } from '@/components/ui/table'
import { BellIcon } from 'lucide-react'
import React from 'react'

//loading için sanal bekleme süresi ekleme
export const revalidate = 0 //cache'i kaldırma
export const fetchCache = 'force-no-store' //cache'i kaldırma

// Yapay gecikme için sleep fonksiyonu
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Notifications() {
  // 2 saniye yapay gecikme ekle
  await sleep(2000);
  
  // Örnek bildirim verileri
  const notifications = [
    {
      id: 1,
      message: "Yeni bir mesajınız var",
      date: "2024-03-20",
      status: "okunmadı"
    },
    {
      id: 2,
      message: "Profiliniz güncellendi",
      date: "2024-03-19",
      status: "okundu"
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications 🔔</h1>
      
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
        <Table>
          <thead className="">
            <tr>
              <th className="border-b border-gray-300 p-3 text-left">Message</th>
              <th className="border-b border-gray-300 p-3 text-left">Date</th>
              <th className="border-b border-gray-300 p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={notification.id} className={index !== notifications.length - 1 ? "border-b border-gray-300" : ""}>
                <td className="p-3">{notification.message}</td>
                <td className="p-3">{notification.date}</td>
                <td className="p-3">{notification.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

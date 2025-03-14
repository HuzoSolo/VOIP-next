import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="p-4 space-y-6">
      {/* Başlık kısmı */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="text-4xl animate-bounce">📬</div>
        <h1 className="text-2xl font-bold">Bildirimler Yükleniyor...</h1>
      </div>

      {/* Tablo iskeleti */}
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
        {/* Tablo başlığı iskeleti */}
        <div className="bg-gray-50 border-b border-gray-300">
          <div className="grid grid-cols-3 gap-4 p-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        {/* Tablo satırları iskeleti */}
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item} 
            className="border-b border-gray-300 last:border-b-0"
          >
            <div className="grid grid-cols-3 gap-4 p-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
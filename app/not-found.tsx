"use client"

import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        {/* Emoji ve Başlık */}
        <div className="space-y-2">
          <div className="text-8xl animate-bounce">🤔</div>
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Sayfa Bulunamadı</h2>
        </div>

        {/* Açıklama */}
        <p className="text-gray-600 max-w-md mx-auto">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </p>

        {/* Aksiyonlar */}
        <div className="space-x-4">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="hover:bg-gray-100 hover:text-black"
          >
            Geri Dön
          </Button>
          
          <Button
            asChild
            className="bg-primary hover:bg-primary/90"
          >
            <Link href="/">
              Ana Sayfaya Git
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

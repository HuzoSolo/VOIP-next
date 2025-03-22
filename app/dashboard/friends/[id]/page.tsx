import React from 'react'
import Link from 'next/link'
import MessageStream from '../components/MessageStream'

// Friend tipi tanımlama
type Friend = {
  id: string;
  name: string;
  avatar: string;
  status: string;
  email: string;
  phone: string;
  location: string;
}

// Gerçek uygulamada bu veri API'den gelecektir
const mockFriends: Friend[] = [
  {
    id: 'friend123',
    name: 'Alice Johnson',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Alice',
    status: 'online',
    email: 'alice@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA'
  },
  {
    id: 'friend456', 
    name: 'Bob Smith',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Bob',
    status: 'offline',
    email: 'bob@example.com',
    phone: '+1 (555) 987-6543',
    location: 'Los Angeles, USA'
  },
  {
    id: 'friend789',
    name: 'Carol Williams',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Carol', 
    status: 'away',
    email: 'carol@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, USA'
  }
]

// Bu fonksiyon, Next.js'in statik site oluşturma sırasında hangi dinamik parametreleri kullanacağını belirtir
export function generateStaticParams() {
  return mockFriends.map((friend) => ({
    id: friend.id,
  }))
}

// Server component olarak çalışacak
export default function FriendProfile({ params }: { params: { id: string } }) {
  // Server-side veri alımı
  const friend = mockFriends.find(f => f.id === params.id) || null;

  if (!friend) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Arkadaş bulunamadı</h2>
        <Link href="/dashboard/friends" className="text-blue-500 hover:underline">
          Arkadaş listesine dön
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">


      <div className="bg-[#1a1f36] rounded-lg shadow-md p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={friend.avatar}
              alt={friend.name}
              className="h-32 w-32 rounded-full border-2 border-gray-700"
            />
            <span 
              className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-[#1a1f36] ${
                friend.status === 'online' ? 'bg-green-500' :
                friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{friend.name}</h1>
            <p className="text-gray-400 capitalize mb-4">{friend.status}</p>
            
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-300">{friend.email}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-300">{friend.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300">{friend.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mesaj akışı ve form bileşeni */}
      <div className="mt-8 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Mesajlar</h2>
          <div className="text-sm">
            {friend.status === 'online' ? (
              <span className="flex items-center text-green-500">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                Çevrimiçi
              </span>
            ) : friend.status === 'away' ? (
              <span className="flex items-center text-yellow-500">
                <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                Uzakta
              </span>
            ) : (
              <span className="flex items-center text-gray-500">
                <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                Çevrimdışı
              </span>
            )}
          </div>
        </div>
        <MessageStream friendName={friend.name} friendId={friend.id} />
      </div>
    </div>
  )
} 
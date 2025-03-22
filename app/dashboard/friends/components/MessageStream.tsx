"use client"

import React, { useState, useRef, useEffect } from 'react'

interface Message {
  id: string;
  sender: 'user' | 'friend';
  content: string;
  timestamp: Date;
}

interface MessageStreamProps {
  friendName: string;
  friendId: string;
}

export default function MessageStream({ friendName, friendId }: MessageStreamProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    // Örnek mesajlar
    {
      id: '1',
      sender: 'friend',
      content: `Merhaba! Ben ${friendName}. Nasılsın?`,
      timestamp: new Date(Date.now() - 3600000) // 1 saat önce
    },
    {
      id: '2',
      sender: 'user',
      content: 'Merhaba! Ben iyiyim, sen nasılsın?',
      timestamp: new Date(Date.now() - 3500000)
    },
    {
      id: '3',
      sender: 'friend',
      content: 'Ben de iyiyim, teşekkür ederim! Bugün neler yapıyorsun?',
      timestamp: new Date(Date.now() - 3400000)
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Mesajlar güncellendiğinde en alta kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Yeni mesaj oluştur
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: message,
      timestamp: new Date()
    };
    
    // Mesajlar listesine ekle
    setMessages([...messages, newMessage]);
    
    // Mesaj alanını temizle
    setMessage('');
    
    // Gerçek uygulamada burada API çağrısı yapılır
    console.log(`Mesaj gönderildi: ${message}`);
    
    // Arkadaştan otomatik cevap (demo amaçlı)
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'friend',
        content: `"${message}" mesajına otomatik cevap. Gerçek uygulamada bu mesaj API'den gelecektir.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  // Zaman formatını düzenle
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[50vh] bg-[#03050e] rounded-lg shadow-md border border-gray-700">
      {/* Mesaj Akışı */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#03050e] rounded-t-lg"
        style={{ height: '400px', maxHeight: '400px' }}
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-[#40a137] text-white rounded-br-none border border-[#40a137]' 
                  : 'bg-[#4d5164] text-gray-100 rounded-bl-none border border-[#4d5164]'
              }`}
            >
              <p className="break-words">{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Mesaj Formu */}
      <div className="border-t border-gray-700 p-4 bg-[#03050e] rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 bg-[#03050e] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder-gray-400"
            placeholder={`${friendName}'e bir mesaj yaz...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-[#40a137] text-white rounded-md hover:bg-[#3d9934] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!message.trim()}
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
} 
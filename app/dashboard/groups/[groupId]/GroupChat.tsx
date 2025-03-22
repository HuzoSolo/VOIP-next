"use client"

import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  content: string
  timestamp: Date
  sender: {
    id: string
    name: string
    avatar: string
  }
  isCurrentUser: boolean
}

interface GroupChatProps {
  groupId: string
}

export default function GroupChat({ groupId }: GroupChatProps) {
  const [messageInput, setMessageInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Mock group data - replace with real data fetch
  const groupData = {
    id: groupId,
    name: 'Gaming Squad',
    memberCount: 5,
    avatar: 'https://api.dicebear.com/6.x/identicon/svg?seed=gaming',
  }

  // Mock messages - replace with real-time messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hey everyone! Welcome to the group!',
      timestamp: new Date(Date.now() - 3600000),
      sender: {
        id: '1',
        name: 'Alice Johnson',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Alice'
      },
      isCurrentUser: true
    },
    {
      id: '2',
      content: 'Thanks for having us here!',
      timestamp: new Date(Date.now() - 3500000),
      sender: {
        id: '2',
        name: 'Bob Smith',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Bob'
      },
      isCurrentUser: false
    },
    {
      id: '3',
      content: 'Looking forward to our discussions!',
      timestamp: new Date(Date.now() - 3400000),
      sender: {
        id: '3',
        name: 'Carol Williams',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Carol'
      },
      isCurrentUser: false
    }
  ])

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    // Add new message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageInput,
      timestamp: new Date(),
      sender: {
        id: '1',
        name: 'Current User',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=current'
      },
      isCurrentUser: true
    }

    setMessages([...messages, newMessage])
    setMessageInput('')
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="flex flex-col h-screen bg-[#03050e]">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-700 bg-[#03050e]">
        <Link 
          href="/dashboard/groups"
          className="p-2 hover:bg-[#4d5164] rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-300" />
        </Link>
        <img
          src={groupData.avatar}
          alt={groupData.name}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-white">{groupData.name}</h2>
          <p className="text-sm text-gray-400">{groupData.memberCount} members</p>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#03050e]"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
              message.isCurrentUser 
                ? 'bg-[#40a137] text-white rounded-br-none border border-[#40a137]'
                : 'bg-[#4d5164] text-gray-100 rounded-bl-none border border-[#4d5164]'
            }`}>
              <div className="flex items-start gap-2">
                {!message.isCurrentUser && (
                  <img
                    src={message.sender.avatar}
                    alt={message.sender.name}
                    className="h-6 w-6 rounded-full"
                  />
                )}
                <div className="flex-1">
                  <p className="text-xs text-gray-300 mb-1">{message.sender.name}</p>
                  <p className="break-words">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isCurrentUser ? 'text-blue-100' : 'text-gray-400'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-700 p-4 bg-[#03050e]">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 bg-[#03050e] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#40a137] text-white rounded-md hover:bg-[#3d9934] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!messageInput.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
} 
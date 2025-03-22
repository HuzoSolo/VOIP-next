"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Home,
  MessageSquare,
  PhoneCall,
  Video,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Group,
  MessagesSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarProps = {
  user: {
    id: string;
    name: string;
    avatar: string;
    status: string;
  };
  isOpen: boolean;
  onToggle: () => void;
};

export function Sidebar({ user, isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  // Mock friends data
  const friends = [
    {
      id: 'friend123',
      name: 'Alice Johnson',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Alice',
      status: 'online'
    },
    {
      id: 'friend456',
      name: 'Bob Smith',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Bob',
      status: 'offline'
    },
    {
      id: 'friend789',
      name: 'Carol Williams',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Carol',
      status: 'away'
    }
  ];

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/groups', label: 'Group Chats', icon: MessagesSquare },
    { href: '/dashboard/friends', label: 'Friends', icon: Users },
    { href: '/dashboard/profile', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "h-screen bg-card border-r flex flex-col transition-all duration-300 sticky top-0",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4 flex items-center justify-between border-b">
        {isOpen && (
          <Link href="/dashboard" className="font-semibold text-lg">
            <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            className="lucide lucide-antenna">
              <path d="M2 12 7 2" /><path d="m7 12 5-10" />
              <path d="m12 12 5-10" /><path d="m17 12 5-10" />
              <path d="M4.5 7h15" /><path d="M12 16v6" /></svg>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(!isOpen && "mx-auto")}
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", isOpen && "mr-2")} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {isOpen && (
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Friends
              </h3>
              <div className="mt-2 space-y-1">
                {friends.map((friend) => (
                  <Link
                    key={friend.id}
                    href={`/dashboard/friends/${friend.id}`}

                    className="flex items-center px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className={cn(
                        "absolute bottom-0 right-1 h-2 w-2 rounded-full",
                        friend.status === 'online' ? "bg-green-500" : "bg-gray-400"
                      )} />
                    </div>
                    <span className="truncate">{friend.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>


      <div className="p-4 border-t">
        <div className={cn(
          "flex items-center",
          isOpen ? "justify-between" : "justify-center"
        )}>
          {isOpen && (
            <Link href="/dashboard/profile">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.status}</p>
                </div>
              </div>
            </Link>
          )}

          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

    </div>
  );
}
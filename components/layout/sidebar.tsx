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
  ChevronRight
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
    { id: '1', name: 'Alice Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'online' },
    { id: '2', name: 'Bob Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'online' },
    { id: '3', name: 'Carol Williams', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'offline' },
    { id: '4', name: 'Dave Brown', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'online' },
    { id: '5', name: 'Eve Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'offline' },
  ];
  
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/voice-calls', label: 'Voice Calls', icon: PhoneCall },
    { href: '/dashboard/video-calls', label: 'Video Calls', icon: Video },
    { href: '/dashboard/friends', label: 'Friends', icon: Users },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "h-screen bg-card border-r flex flex-col transition-all duration-300",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4 flex items-center justify-between border-b">
        {isOpen && (
          <Link href="/dashboard" className="font-semibold text-lg">
            VoiceConnect
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
                    href={`/dashboard/dm/${friend.id}`}
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
          )}
          
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
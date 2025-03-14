import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PhoneCall, MessageSquare, Users, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to VoiceConnect</h1>
          <p className="text-muted-foreground">Your modern VOIP communication platform</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 py-8">
          <div className="flex flex-col items-center p-4 bg-card rounded-lg">
            <PhoneCall className="h-10 w-10 mb-2 text-primary" />
            <h2 className="font-semibold">Voice Calls</h2>
            <p className="text-sm text-muted-foreground">Crystal clear audio</p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-card rounded-lg">
            <MessageSquare className="h-10 w-10 mb-2 text-primary" />
            <h2 className="font-semibold">Messaging</h2>
            <p className="text-sm text-muted-foreground">Instant chat</p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-card rounded-lg">
            <Users className="h-10 w-10 mb-2 text-primary" />
            <h2 className="font-semibold">Friends</h2>
            <p className="text-sm text-muted-foreground">Stay connected</p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-card rounded-lg">
            <Settings className="h-10 w-10 mb-2 text-primary" />
            <h2 className="font-semibold">Settings</h2>
            <p className="text-sm text-muted-foreground">Customize your experience</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link href="/login">
            <Button className="w-full">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="w-full mt-3">Create Account</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
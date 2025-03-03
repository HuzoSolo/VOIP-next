"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Mail, Phone, Calendar } from 'lucide-react';

type ProfileCardProps = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    status: string;
    bio?: string;
    location?: string;
    phone?: string;
    joinedDate?: string;
  };
};

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.bio}</CardDescription>
        <div className="mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            {user.status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {user.location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{user.location}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          
          {user.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{user.phone}</span>
            </div>
          )}
          
          {user.joinedDate && (
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Joined {user.joinedDate}</span>
            </div>
          )}
          
          <div className="pt-4">
            <Button className="w-full">Edit Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
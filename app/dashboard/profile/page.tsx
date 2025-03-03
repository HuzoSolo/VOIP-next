"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileCard } from '@/components/profile/profile-card';
import { SettingsForm } from '@/components/profile/settings-form';

export default function ProfilePage() {
  // Mock user data
  const userData = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'online',
    bio: 'Software developer and tech enthusiast',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    joinedDate: 'January 2023',
  };
  
  const handleUpdateSettings = (data: any) => {
    console.log('Settings updated:', data);
    // In a real app, you would update the user data here
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileCard user={userData} />
        </div>
        
        <div className="md:col-span-2">
          <SettingsForm user={userData} onSave={handleUpdateSettings} />
        </div>
      </div>
    </div>
  );
}
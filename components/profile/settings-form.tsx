"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Bell, Lock, User } from 'lucide-react';
import bcrypt from 'bcryptjs';

type ProfileFormValues = {
  name: string;
  email: string;
  bio: string;
  location: string;
  phone: string;
};

type NotificationFormValues = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  callNotifications: boolean;
  messageNotifications: boolean;
  friendRequestNotifications: boolean;
};

type SecurityFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type SettingsFormProps = {
  user: {
    id: string;
    name: string;
    email: string;
    bio?: string;
    location?: string;
    phone?: string;
  };
  onSave: (data: any) => void;
};

export function SettingsForm({ user, onSave }: SettingsFormProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      bio: user.bio || '',
      location: user.location || '',
      phone: user.phone || '',
    },
  });
  
  const notificationForm = useForm<NotificationFormValues>({
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      callNotifications: true,
      messageNotifications: true,
      friendRequestNotifications: true,
    },
  });
  
  const securityForm = useForm<SecurityFormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function handleProfileSubmit(values: ProfileFormValues) {
    // Clear previous errors
    setErrors({});
    
    // Validate form
    let hasErrors = false;
    const newErrors: Record<string, string> = {};
    
    if (!values.name || values.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      hasErrors = true;
    }
    
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    // Create payload: base64 encoded string of all values concatenated
    const payload = btoa(`${values.name}:${values.email}:${values.bio}:${values.location}:${values.phone}`);
    
    // TEST: Log the payload and show decoded version
    console.log('Profile Encoded payload:', payload);
    console.log('Profile Decoded payload:', atob(payload));
    
    // Create a test element to display the payload (will be removed in production)
    const testDiv = document.createElement('div');
    testDiv.style.padding = '10px';
    testDiv.style.margin = '10px 0';
    testDiv.style.border = '1px solid #ccc';
    testDiv.style.borderRadius = '4px';
    testDiv.style.backgroundColor = '#f5f5f5';
    
    testDiv.innerHTML = `
      <h3>Profile Test Payload (Remove in production)</h3>
      <p><strong>Encoded:</strong> ${payload}</p>
      <p><strong>Decoded:</strong> ${atob(payload)}</p>
    `;
    
    // Add to the form
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.appendChild(testDiv);
    }
    
    // TEST: Send to test API endpoint
    try {
      fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload, type: 'profile' }),
      })
      .then(response => response.json())
      .then(testResult => {
        console.log('Test API response:', testResult);
        
        // Display test result
        const testResultDiv = document.createElement('div');
        testResultDiv.style.padding = '10px';
        testResultDiv.style.margin = '10px 0';
        testResultDiv.style.border = '1px solid #4CAF50';
        testResultDiv.style.borderRadius = '4px';
        testResultDiv.style.backgroundColor = '#E8F5E9';
        
        testResultDiv.innerHTML = `
          <h3>Test API Response (Remove in production)</h3>
          <pre>${JSON.stringify(testResult, null, 2)}</pre>
        `;
        
        if (formElement) {
          formElement.appendChild(testResultDiv);
        }
      });
    } catch (testError) {
      console.error('Error testing API:', testError);
    }
    
    // Call the onSubmit function with the payload
    onSave({ payload, type: 'profile' });
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  }
  
  function handleNotificationSubmit(values: NotificationFormValues) {
    // Create payload: base64 encoded string of all values concatenated
    const payload = btoa(
      `${values.emailNotifications}:${values.pushNotifications}:${values.callNotifications}:${values.messageNotifications}:${values.friendRequestNotifications}`
    );
    
    // TEST: Log the payload and show decoded version
    console.log('Notification Encoded payload:', payload);
    console.log('Notification Decoded payload:', atob(payload));
    
    // Create a test element to display the payload (will be removed in production)
    const testDiv = document.createElement('div');
    testDiv.style.padding = '10px';
    testDiv.style.margin = '10px 0';
    testDiv.style.border = '1px solid #ccc';
    testDiv.style.borderRadius = '4px';
    testDiv.style.backgroundColor = '#f5f5f5';
    
    testDiv.innerHTML = `
      <h3>Notification Test Payload (Remove in production)</h3>
      <p><strong>Encoded:</strong> ${payload}</p>
      <p><strong>Decoded:</strong> ${atob(payload)}</p>
    `;
    
    // Add to the form
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.appendChild(testDiv);
    }
    
    // Call the onSubmit function with the payload
    onSave({ payload, type: 'notifications' });
    
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
  }
  
  async function handleSecuritySubmit(values: SecurityFormValues) {
    // Clear previous errors
    setErrors({});
    
    // Validate form
    let hasErrors = false;
    const newErrors: Record<string, string> = {};
    
    if (!values.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      hasErrors = true;
    }
    
    if (!values.newPassword || values.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      hasErrors = true;
    }
    
    if (values.newPassword !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    try {
      // Hash passwords with bcrypt
      const hashedOldPassword = await bcrypt.hash(values.currentPassword, 10);
      const hashedNewPassword = await bcrypt.hash(values.newPassword, 10);
      
      // Create payload: base64(bcrypted_old_password:bcrypted_new_password)
      const payload = btoa(`${hashedOldPassword}:${hashedNewPassword}`);
      
      // TEST: Log the payload and show decoded version
      console.log('Security Encoded payload:', payload);
      console.log('Security Decoded payload:', atob(payload));
      
      // Create a test element to display the payload (will be removed in production)
      const testDiv = document.createElement('div');
      testDiv.style.padding = '10px';
      testDiv.style.margin = '10px 0';
      testDiv.style.border = '1px solid #ccc';
      testDiv.style.borderRadius = '4px';
      testDiv.style.backgroundColor = '#f5f5f5';
      
      testDiv.innerHTML = `
        <h3>Security Test Payload (Remove in production)</h3>
        <p><strong>Encoded:</strong> ${payload}</p>
        <p><strong>Decoded:</strong> ${atob(payload)}</p>
      `;
      
      // Add to the form
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.appendChild(testDiv);
      }
      
      // Call the onSubmit function with the payload
      onSave({ payload, type: 'security' });
      
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully.",
      });
      
      securityForm.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error processing form:', error);
      setErrors({ form: 'An error occurred while processing your request' });
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  placeholder="Your name" 
                  {...profileForm.register('name')}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="Your email" 
                  {...profileForm.register('email')}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  placeholder="Tell us about yourself" 
                  className="resize-none min-h-[100px]"
                  {...profileForm.register('bio')}
                />
                <p className="text-sm text-muted-foreground">
                  Brief description for your profile. Maximum 160 characters.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    placeholder="City, Country" 
                    {...profileForm.register('location')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone"
                    placeholder="Your phone number" 
                    {...profileForm.register('phone')}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Save Profile</Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <form onSubmit={notificationForm.handleSubmit(handleNotificationSubmit)} className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications about account activity
                    </p>
                  </div>
                  <Switch
                    checked={notificationForm.watch('emailNotifications')}
                    onCheckedChange={(checked) => notificationForm.setValue('emailNotifications', checked)}
                    disabled={true}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your devices
                    </p>
                  </div>
                  <Switch
                    checked={notificationForm.watch('pushNotifications')}
                    onCheckedChange={(checked) => notificationForm.setValue('pushNotifications', checked)}
                    disabled={true}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Call Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about incoming voice and video calls
                    </p>
                  </div>
                  <Switch
                    checked={notificationForm.watch('callNotifications')}
                    onCheckedChange={(checked) => notificationForm.setValue('callNotifications', checked)}
                    disabled={true}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Message Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new messages
                    </p>
                  </div>
                  <Switch
                    checked={notificationForm.watch('messageNotifications')}
                    onCheckedChange={(checked) => notificationForm.setValue('messageNotifications', checked)}
                    disabled={true}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Friend Request Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new friend requests
                    </p>
                  </div>
                  <Switch
                    checked={notificationForm.watch('friendRequestNotifications')}
                    onCheckedChange={(checked) => notificationForm.setValue('friendRequestNotifications', checked)}
                    disabled={true}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Save Notification Settings</Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <form onSubmit={securityForm.handleSubmit(handleSecuritySubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword"
                  type="password" 
                  placeholder="••••••••" 
                  {...securityForm.register('currentPassword')}
                />
                {errors.currentPassword && <p className="text-sm text-red-500">{errors.currentPassword}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword"
                  type="password" 
                  placeholder="••••••••" 
                  {...securityForm.register('newPassword')}
                />
                <p className="text-sm text-muted-foreground">
                  Password must be at least 8 characters and include a number
                </p>
                {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword"
                  type="password" 
                  placeholder="••••••••" 
                  {...securityForm.register('confirmPassword')}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
              
              {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}
              
              <div className="flex justify-end">
                <Button type="submit">Update Password</Button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
              <p className="text-muted-foreground mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <Button variant="outline">Enable 2FA</Button>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4 text-destructive">Danger Zone</h3>
              <p className="text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
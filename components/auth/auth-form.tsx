"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import bcrypt from 'bcryptjs';

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthFormProps = {
  onSubmit: (data: any) => void;
  type: 'login' | 'register';
};

export function AuthForm({ onSubmit, type }: AuthFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const form = useForm<LoginFormValues | RegisterFormValues>({
    defaultValues: type === 'login' 
      ? { email: '', password: '' }
      : { username: '', email: '', password: '', confirmPassword: '' },
  });

  async function handleSubmit(values: any) {
    // Clear previous errors
    setErrors({});
    
    // Validate form
    let hasErrors = false;
    const newErrors: Record<string, string> = {};
    
    if (type === 'register') {
      const registerValues = values as RegisterFormValues;
      
      if (!registerValues.username || registerValues.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
        hasErrors = true;
      }
      
      if (registerValues.password !== registerValues.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
        hasErrors = true;
      }
    }
    
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }
    
    if (!values.password || values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    try {
      // Hash password with bcrypt
      const hashedPassword = await bcrypt.hash(values.password, 10);
      
      let payload;
      if (type === 'login') {
        // For login: base64(username:hashed_password)
        payload = btoa(`${values.email}:${hashedPassword}`);
      } else {
        // For register: similar structure
        const registerValues = values as RegisterFormValues;
        payload = btoa(`${registerValues.username}:${hashedPassword}`);
      }
      
      // TEST: Log the payload and show decoded version
      console.log('Encoded payload:', payload);
      console.log('Decoded payload:', atob(payload));
      
      // Create a test element to display the payload (will be removed in production)
      const testDiv = document.createElement('div');
      testDiv.style.padding = '10px';
      testDiv.style.margin = '10px 0';
      testDiv.style.border = '1px solid #ccc';
      testDiv.style.borderRadius = '4px';
      testDiv.style.backgroundColor = '#000000';
      
      testDiv.innerHTML = `
        <h3>Test Payload (Remove in production)</h3>
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
        const testResponse = await fetch('/api/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ payload, type }),
        });
        
        const testResult = await testResponse.json();
        console.log('Test API response:', testResult);
        
        // Display test result
        const testResultDiv = document.createElement('div');
        testResultDiv.style.padding = '10px';
        testResultDiv.style.margin = '10px 0';
        testResultDiv.style.border = '1px solid #4CAF50';
        testResultDiv.style.borderRadius = '4px';
        testResultDiv.style.backgroundColor = '#000000';
        
        testResultDiv.innerHTML = `
          <h3>Test API Response (Remove in production)</h3>
          <pre>${JSON.stringify(testResult, null, 2)}</pre>
        `;
        
        if (formElement) {
          formElement.appendChild(testResultDiv);
        }
      } catch (testError) {
        console.error('Error testing API:', testError);
      }
      
      // Call the onSubmit function with the payload
      onSubmit({ payload });
    } catch (error) {
      console.error('Error processing form:', error);
      setErrors({ form: 'An error occurred while processing your request' });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      {type === 'register' && (
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username"
            placeholder="Magnus" 
            {...form.register('username')}
          />
          {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email"
          type="email" 
          placeholder="magnus@example.com" 
          {...form.register('email')}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password"
          type="password" 
          placeholder="••••••••" 
          {...form.register('password')}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>
      
      {type === 'register' && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword"
            type="password" 
            placeholder="••••••••" 
            {...form.register('confirmPassword')}
          />
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>
      )}
      
      {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}
      
      <Button type="submit" className="w-full">
        {type === 'login' ? 'Login' : 'Create Account'}
      </Button>
    </form>
  );
}
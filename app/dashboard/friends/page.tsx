"use client"

import React from 'react'
import Link from 'next/link'
import { Files, UserPlus } from 'lucide-react'


export default async function friends() {



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">


      <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="# # # # # #"
                className="px-3 py-3 border rounded-md bg-background"
                
              />
              <button
                className="ml-2 p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => {
                  // Friend code handling logic will go here
                  console.log('Friend code submitted');
                }}
              >
                <UserPlus className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <input
                type="text"
                value="A B C 1 2 3"
                className="px-3 py-3 border rounded-md bg-background"
                readOnly
              />
              <button
                className="ml-2 p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => {
                  // Friend code handling logic will go here
                  console.log('Friend code submitted');
                }}
              >
                <Files className="h-6 w-6" />
              </button>
            </div>
          </div>

      </div>

      {/* Friend Requests */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Friend Requests</h3>
        </div>
        <div className="p-4 space-y-4 overflow-auto">
          {/* Mock friend requests - in real app this would come from API/database */}
          {[
            {
              id: 'request1',
              name: 'David Brown',
              avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=David',
              mutualFriends: 3
            },
            {
              id: 'request2',
              name: 'Emma Wilson',
              avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Emma',
              mutualFriends: 1
            }
          ].map((request) => (
            <div key={request.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={request.avatar}
                  alt={request.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{request.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {request.mutualFriends} mutual friends
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Accept
                </button>
                <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Friends List */}
      <div className="grid gap-4">
        {/* Mock friends data - in real app this would come from API/database */}
        {[
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
          
          },


          


        ].map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors h-20 overflow-hidden"
          >
            <Link 
              href={`/dashboard/friends/${friend.id}`}
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="h-12 w-12 rounded-full"  
                />
                <span 
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                    friend.status === 'online' ? 'bg-green-500' :
                    friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}
                />
              </div>
              <div>
                <h3 className="font-medium">{friend.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{friend.status}</p>
              </div>
            </Link>

            <button
              onClick={() => {
                // Handle friend removal here
                console.log(`Removing friend: ${friend.id}`);
              }}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.016 28q0 0.832 0.576 1.44t1.408 0.576h16q-2.496 0-4.256-1.76t-1.728-4.256q0-2.208 1.44-3.872t3.584-2.016q1.376-1.152 2.176-2.72t0.8-3.392v-1.984q0-3.328-2.368-5.664t-5.632-2.336-5.664 2.336-2.336 5.664v1.984q0 2.112 1.024 3.904t2.784 2.912q-1.504 0.544-2.912 1.504t-2.496 2.144-1.76 2.624-0.64 2.912zM18.016 24q0 0.832 0.576 1.44t1.408 0.576h8q0.832 0 1.408-0.576t0.608-1.44-0.608-1.408-1.408-0.576h-8q-0.832 0-1.408 0.576t-0.576 1.408z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
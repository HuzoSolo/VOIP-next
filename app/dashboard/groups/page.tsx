"use client"

import React, { useState } from 'react'
import { Users, Copy, Plus, X, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function Groups() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupDescription, setGroupDescription] = useState('')
  const [searchGroupId, setSearchGroupId] = useState('')

  // Mock function to generate random group ID
  const generateGroupId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  return (
    <div className="space-y-6 relative">
      {/* Search and Create Panel */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search Group by ID Section */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Enter Group ID to Join"
              className="px-3 py-3 border rounded-md bg-background w-64"
              value={searchGroupId}
              onChange={(e) => setSearchGroupId(e.target.value)}
            />
            <button
              className="ml-2 p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => {
                console.log('Searching for group:', searchGroupId);
                // Add your group search logic here
              }}
            >
              <Users className="h-6 w-6" />
            </button>
          </div>

          {/* Create Group Button */}
          <button
            className="p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-6 w-6" />
            <span>Create Group</span>
          </button>
        </div>
      </div>

      {/* Groups List */}
      <div className="grid gap-4">
        {[
          {
            id: 'ABC123',
            name: 'Gaming Squad',
            memberCount: 5,
            avatar: 'https://api.dicebear.com/6.x/identicon/svg?seed=gaming',
            isJoined: true
          },
          {
            id: 'XYZ789',
            name: 'Movie Club',
            memberCount: 8,
            avatar: 'https://api.dicebear.com/6.x/identicon/svg?seed=movie',
            isJoined: false
          }
        ].map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <Link
              href={`/dashboard/groups/${group.id}`}
              className="flex items-center gap-4 flex-1 cursor-pointer"
            >
              <img
                src={group.avatar}
                alt={group.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{group.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Group ID: {group.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  {group.memberCount} members
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(group.id);
                  // Add toast notification here
                  console.log('Group ID copied:', group.id);
                }}
                className="p-2 hover:bg-accent rounded-md transition-colors"
                title="Copy Group ID"
              >
                <Copy className="h-5 w-5" />
              </button>
              {group.isJoined ? (
                <button
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors flex items-center gap-2"
                  onClick={() => {
                    console.log(`Leaving group: ${group.id}`);
                    // Add your leave group logic here
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  Leave
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  onClick={() => {
                    console.log(`Joining group: ${group.id}`);
                    // Add your join group logic here
                  }}
                >
                  Join
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Group Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-96 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Create New Group</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-accent rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="Enter group name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="Enter group description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Group ID
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={generateGroupId()}
                    readOnly
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                  <button
                    onClick={() => {
                      const newId = generateGroupId();
                      navigator.clipboard.writeText(newId);
                      // Add toast notification here
                    }}
                    className="p-2 hover:bg-accent rounded-md"
                    title="Copy Group ID"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Creating group:', { groupName, groupDescription });
                    // Add your group creation logic here
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

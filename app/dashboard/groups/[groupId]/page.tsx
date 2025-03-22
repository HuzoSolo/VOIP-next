import React from 'react'
import GroupChat from './GroupChat'

export default function GroupPage({ params }: { params: { groupId: string } }) {
  return (
    <div className="h-screen w-full">
      <GroupChat groupId={params.groupId} />
    </div>
  )
}

// This is required for static site generation
export async function generateStaticParams() {
  // You would typically fetch this from your API/database
  // For now, we'll return some static group IDs
  return [
    { groupId: 'ABC123' },
    { groupId: 'XYZ789' }
  ]
} 
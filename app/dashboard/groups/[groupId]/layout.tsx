import React from 'react'
  
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full">
      <div className="p-0 m-0">
        {children}
      </div>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PhoneCall, Video, MessageSquare, UserPlus } from 'lucide-react';

export default function DashboardPage() {
  // Mock recent activity data
  const recentActivity = [
    { id: '1', type: 'call', user: 'Alice Smith', time: '10 minutes ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: '2', type: 'message', user: 'Bob Johnson', time: '30 minutes ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: '3', type: 'video', user: 'Carol Williams', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  ];
  
  // Mock suggested friends
  const suggestedFriends = [
    { id: '1', name: 'Mike Taylor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', mutualFriends: 5 },
    { id: '2', name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', mutualFriends: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start a conversation or call</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <MessageSquare className="h-6 w-6 mb-1" />
                <span>New Message</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <PhoneCall className="h-6 w-6 mb-1" />
                <span>Voice Call</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Video className="h-6 w-6 mb-1" />
                <span>Video Call</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <UserPlus className="h-6 w-6 mb-1" />
                <span>Add Friend</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.type === 'call' && 'Voice call'}
                      {activity.type === 'message' && 'Sent a message'}
                      {activity.type === 'video' && 'Video call'}
                      {' · '}
                      {activity.time}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    {activity.type === 'call' && <PhoneCall className="h-4 w-4" />}
                    {activity.type === 'message' && <MessageSquare className="h-4 w-4" />}
                    {activity.type === 'video' && <Video className="h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Suggested Friends</CardTitle>
            <CardDescription>People you might know</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestedFriends.map((friend) => (
                <div key={friend.id} className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{friend.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {friend.mutualFriends} mutual friends
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
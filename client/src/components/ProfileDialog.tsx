import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, MapPin, Mail, Phone, Building, Calendar, Trophy } from "lucide-react";
import { useLocation } from "wouter";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const [, setLocation] = useLocation();

  const user = {
    name: "Aarav Sharma",
    username: "aarav.sharma",
    email: "aarav@example.com",
    mobile: "+91 98765 43210",
    location: "Delhi, India",
    role: "Student",
    institution: "Delhi Public School",
    ecoPoints: 1250,
    activeDays: [
      "2025-10-03", "2025-10-02", "2025-10-01", "2025-09-30", 
      "2025-09-29", "2025-09-28", "2025-09-27", "2025-09-25",
      "2025-09-24", "2025-09-23", "2025-09-20", "2025-09-19"
    ],
    achievements: [
      {
        id: "1",
        title: "First Steps",
        description: "Completed your first challenge",
        icon: "🎯",
        unlockedAt: "2025-09-15"
      },
      {
        id: "2",
        title: "Tree Hugger",
        description: "Planted 5 trees",
        icon: "🌳",
        unlockedAt: "2025-09-20"
      },
      {
        id: "3",
        title: "Quiz Master",
        description: "Scored 100% on a quiz",
        icon: "🏆",
        unlockedAt: "2025-09-25"
      },
      {
        id: "4",
        title: "Week Warrior",
        description: "7-day streak achieved",
        icon: "🔥",
        unlockedAt: "2025-10-01"
      }
    ] as Achievement[]
  };

  const handleLogout = () => {
    onOpenChange(false);
    setLocation("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const getActiveDaysCalendar = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 89; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const isActive = user.activeDays.includes(dateStr);
      const isToday = i === 0;
      
      days.push({
        date: dateStr,
        isActive,
        isToday
      });
    }
    
    return days;
  };

  const activeDaysCalendar = getActiveDaysCalendar();
  const currentStreak = user.activeDays.filter(day => {
    const date = new Date(day);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-profile">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold" data-testid="text-profile-name">{user.name}</h3>
              <p className="text-muted-foreground" data-testid="text-profile-username">@{user.username}</p>
              <div className="mt-2 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary" data-testid="text-profile-points">
                  {user.ecoPoints} Eco Points
                </span>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-3">
              {user.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span data-testid="text-profile-email">{user.email}</span>
                </div>
              )}
              {user.mobile && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span data-testid="text-profile-mobile">{user.mobile}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span data-testid="text-profile-location">{user.location}</span>
                </div>
              )}
              {user.institution && (
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span data-testid="text-profile-institution">{user.institution}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Active Days
              </h4>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground" data-testid="text-current-streak">{currentStreak}</span> day streak
              </div>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-13 gap-1">
                  {activeDaysCalendar.map((day, index) => (
                    <div
                      key={index}
                      className={`h-3 w-3 rounded-sm ${
                        day.isActive
                          ? 'bg-green-500 dark:bg-green-600'
                          : 'bg-muted'
                      } ${day.isToday ? 'ring-2 ring-primary' : ''}`}
                      title={day.date}
                      data-testid={`activity-day-${index}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>90 days ago</span>
                  <span>Today</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Achievements ({user.achievements.length})
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {user.achievements.map((achievement) => (
                <Card key={achievement.id} data-testid={`achievement-${achievement.id}`}>
                  <CardContent className="pt-4 pb-3">
                    <div className="flex gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-sm" data-testid={`achievement-title-${achievement.id}`}>
                          {achievement.title}
                        </h5>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(achievement.unlockedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

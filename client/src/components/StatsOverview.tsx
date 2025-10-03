import { Card, CardContent } from "@/components/ui/card";
import { Target, Zap, Calendar, TrendingUp } from "lucide-react";

export function StatsOverview() {
  const stats = [
    { label: "Challenges Completed", value: "24", icon: Target, change: "+3 this week" },
    { label: "Current Streak", value: "7 days", icon: Zap, change: "Keep it up!" },
    { label: "This Month", value: "850 pts", icon: Calendar, change: "+120 from last month" },
    { label: "Level Progress", value: "Level 5", icon: TrendingUp, change: "280 pts to Level 6" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="hover-elevate">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

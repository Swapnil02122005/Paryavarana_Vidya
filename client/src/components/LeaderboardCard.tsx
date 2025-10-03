import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  school: string;
  points: number;
  initials: string;
}

export function LeaderboardCard() {
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "Ananya Sharma", school: "Delhi Public School", points: 2450, initials: "AS" },
    { rank: 2, name: "Rohan Patel", school: "Kendriya Vidyalaya", points: 2380, initials: "RP" },
    { rank: 3, name: "Priya Kumar", school: "St. Xavier's School", points: 2290, initials: "PK" },
    { rank: 4, name: "Arjun Singh", school: "DAV Public School", points: 2150, initials: "AS" },
    { rank: 5, name: "Sneha Reddy", school: "Modern School", points: 2080, initials: "SR" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-chart-5" />;
      case 2:
        return <Medal className="h-5 w-5 text-muted-foreground" />;
      case 3:
        return <Award className="h-5 w-5 text-chart-2" />;
      default:
        return <span className="text-sm font-semibold text-muted-foreground">{rank}</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>School Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center gap-4 p-3 rounded-md hover-elevate"
              data-testid={`leaderboard-rank-${entry.rank}`}
            >
              <div className="w-8 flex items-center justify-center">{getRankIcon(entry.rank)}</div>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {entry.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{entry.name}</p>
                <p className="text-sm text-muted-foreground truncate">{entry.school}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{entry.points}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

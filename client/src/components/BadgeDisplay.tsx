import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Leaf, Droplet, Sun, Recycle, TreePine } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  icon: "award" | "leaf" | "droplet" | "sun" | "recycle" | "tree";
  earned: boolean;
  description: string;
}

const iconMap = {
  award: Award,
  leaf: Leaf,
  droplet: Droplet,
  sun: Sun,
  recycle: Recycle,
  tree: TreePine,
};

export function BadgeDisplay() {
  const badges: Badge[] = [
    { id: "1", name: "Tree Planter", icon: "tree", earned: true, description: "Planted 10 trees" },
    { id: "2", name: "Water Saver", icon: "droplet", earned: true, description: "Saved 100L water" },
    { id: "3", name: "Solar Champion", icon: "sun", earned: true, description: "Completed energy module" },
    { id: "4", name: "Recycle Master", icon: "recycle", earned: false, description: "Segregate waste for 30 days" },
    { id: "5", name: "Eco Warrior", icon: "award", earned: false, description: "Complete 50 challenges" },
    { id: "6", name: "Green Leader", icon: "leaf", earned: false, description: "Top 10 in leaderboard" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {badges.map((badge) => {
            const Icon = iconMap[badge.icon];
            return (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-2 p-3 rounded-md transition-all ${
                  badge.earned
                    ? "bg-primary/10 text-primary"
                    : "bg-muted/50 text-muted-foreground opacity-50"
                }`}
                data-testid={`badge-${badge.id}`}
              >
                <div className={`p-3 rounded-full ${badge.earned ? "bg-primary/20" : "bg-muted"}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-center">{badge.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

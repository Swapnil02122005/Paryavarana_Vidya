import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  current: number;
  total: number;
  icon: React.ReactNode;
  color?: string;
}

export function ProgressCard({ title, current, total, icon, color = "primary" }: ProgressCardProps) {
  const percentage = (current / total) * 100;

  return (
    <Card className="hover-elevate">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`text-${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2" data-testid={`text-progress-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {current} / {total}
        </div>
        <Progress value={percentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">{percentage.toFixed(0)}% complete</p>
      </CardContent>
    </Card>
  );
}

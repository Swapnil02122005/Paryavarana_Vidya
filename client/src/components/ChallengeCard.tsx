import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  description: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  duration: string;
  category: string;
}

export function ChallengeCard({
  title,
  description,
  image,
  difficulty,
  points,
  duration,
  category,
}: ChallengeCardProps) {
  const difficultyColors = {
    Easy: "bg-chart-4/20 text-chart-4",
    Medium: "bg-chart-5/20 text-chart-5",
    Hard: "bg-destructive/20 text-destructive",
  };

  return (
    <Card className="hover-elevate overflow-hidden" data-testid={`card-challenge-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <Badge className="absolute top-3 right-3">{category}</Badge>
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="secondary" className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2 pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">{points} pts</span>
          </div>
        </div>
        <Button size="sm" data-testid={`button-start-challenge-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          Start Challenge
        </Button>
      </CardFooter>
    </Card>
  );
}

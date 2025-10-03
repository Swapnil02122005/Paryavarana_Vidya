import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, Clock, Target } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Challenge, ChallengeCompletion } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Challenges() {
  const { toast } = useToast();

  const { data: challenges = [], isLoading } = useQuery<Challenge[]>({
    queryKey: ["/api/challenges"],
  });

  const { data: completions = [] } = useQuery<ChallengeCompletion[]>({
    queryKey: ["/api/challenges/completions"],
  });

  const completionMutation = useMutation({
    mutationFn: async (challengeId: string) => {
      const res = await apiRequest("POST", "/api/challenges/complete", { challengeId });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/challenges/completions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Success!",
        description: "Challenge completed! Eco-points awarded.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark challenge as complete",
        variant: "destructive",
      });
    },
  });

  const isCompleted = (challengeId: string) => {
    return completions.some((c) => c.challengeId === challengeId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading challenges...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2" data-testid="text-title">Environmental Challenges</h1>
          <p className="text-muted-foreground text-lg">
            Take on real-world environmental challenges and make a difference!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => {
            const completed = isCompleted(challenge.id);
            
            return (
              <Card key={challenge.id} className={completed ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""} data-testid={`card-challenge-${challenge.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{challenge.title}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </div>
                    {completed && (
                      <Trophy className="h-6 w-6 text-green-600 flex-shrink-0" data-testid={`icon-completed-${challenge.id}`} />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      <Target className="h-3 w-3 mr-1" />
                      {challenge.category}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{challenge.duration || "Ongoing"}</span>
                    </div>
                    <div className="font-semibold text-primary">
                      +{challenge.points} points
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Checkbox
                      id={`complete-${challenge.id}`}
                      checked={completed}
                      onCheckedChange={() => {
                        if (!completed) {
                          completionMutation.mutate(challenge.id);
                        }
                      }}
                      disabled={completed || completionMutation.isPending}
                      data-testid={`checkbox-complete-${challenge.id}`}
                    />
                    <label
                      htmlFor={`complete-${challenge.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {completed ? "Completed" : "Mark as completed"}
                    </label>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {challenges.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No challenges available yet. Check back soon!</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

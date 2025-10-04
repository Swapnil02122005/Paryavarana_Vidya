import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Gamepad2, Users, Trophy, Clock, Star, AlertTriangle, Shield, Lock, CheckCircle2, CheckCircle, XCircle } from "lucide-react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { GameCompletion, Game } from "@shared/schema";
import wasteSortingImage from "@assets/stock_images/waste_segregation_so_871ae14e.jpg";
import solarEnergyImage from "@assets/stock_images/solar_energy_panels__c1f1b8c7.jpg";
import waterConservationImage from "@assets/stock_images/water_conservation_c_fe482b3a.jpg";
import treePlantingImage from "@assets/stock_images/tree_planting_hands__ffbd7be4.jpg";
import biodiversityImage from "@assets/stock_images/indian_forest_biodiv_e9bbd8eb.jpg";

export default function Games() {
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const userPoints = 2450;
  const { toast } = useToast();

  const { data: gameCompletions = [] } = useQuery<GameCompletion[]>({
    queryKey: ["/api/games/completions"],
  });

  const { data: gamesFromAPI = [], isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: ["/api/games"],
  });

  const isGameCompleted = (gameId: string) => {
    return gameCompletions.some((completion) => completion.gameId === gameId);
  };

  const markCompleteMutation = useMutation({
    mutationFn: async (gameId: string) => {
      return await apiRequest("POST", "/api/games/complete", { 
        gameId, 
        score: 100 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/games/completions"] });
      toast({
        title: "Game Marked Complete",
        description: "This game has been marked as completed.",
      });
    },
  });

  const markIncompleteMutation = useMutation({
    mutationFn: async (gameId: string) => {
      return await apiRequest("DELETE", `/api/games/completions/${gameId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/games/completions"] });
      toast({
        title: "Game Unmarked",
        description: "This game has been marked as incomplete.",
      });
    },
  });

  const getDefaultImage = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('water')) return waterConservationImage;
    if (lowerCategory.includes('solar') || lowerCategory.includes('energy')) return solarEnergyImage;
    if (lowerCategory.includes('tree') || lowerCategory.includes('forest') || lowerCategory.includes('biodiversity')) return biodiversityImage;
    if (lowerCategory.includes('waste') || lowerCategory.includes('plastic')) return wasteSortingImage;
    return biodiversityImage;
  };

  const transformedGames = gamesFromAPI.map(game => ({
    id: game.id,
    title: game.title,
    description: game.description || "",
    type: "Individual",
    difficulty: game.difficulty || "Medium",
    points: game.points || 100,
    duration: "10 min",
    players: "1",
    status: "Play Now",
    image: game.image || getDefaultImage(game.category || ""),
    minPoints: game.difficulty === "Hard" ? 5000 : game.difficulty === "Medium" ? 2500 : 0
  }));

  const individualGames = transformedGames;
  const groupGames: any[] = []; // No group games from API yet

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-chart-4/20 text-chart-4";
      case "Medium":
        return "bg-chart-5/20 text-chart-5";
      case "Hard":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const filterGames = (games: any[]) => {
    return games.filter(game => {
      const difficultyMatch = difficultyFilter === "all" || game.difficulty === difficultyFilter;
      return difficultyMatch;
    });
  };

  const isGameLocked = (minPoints: number) => userPoints < minPoints;

  const filteredIndividualGames = filterGames(individualGames);
  const filteredGroupGames = filterGames(groupGames);

  if (gamesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-display text-3xl font-bold">Interactive Games</h1>
            <p className="text-muted-foreground">Learn environmental concepts through fun, engaging games</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[180px]" data-testid="select-difficulty">
              <SelectValue placeholder="All Difficulties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold mb-1">2,450</p>
              <p className="text-sm text-muted-foreground">Total Points Earned</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-chart-4/10 border-chart-4/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <Star className="h-8 w-8 text-chart-4 mx-auto mb-2" />
              <p className="text-2xl font-bold mb-1">12</p>
              <p className="text-sm text-muted-foreground">Games Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-chart-5/10 border-chart-5/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-chart-5 mx-auto mb-2" />
              <p className="text-2xl font-bold mb-1">5</p>
              <p className="text-sm text-muted-foreground">Team Wins</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Individual Games</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredIndividualGames.map((game) => {
            const locked = isGameLocked(game.minPoints);
            const completed = isGameCompleted(game.id);
            return (
              <ContextMenu key={game.id}>
                <ContextMenuTrigger asChild>
                  <Card className={`hover-elevate ${locked ? 'opacity-75' : ''} ${completed ? 'border-green-500' : ''}`} data-testid={`game-${game.id}`}>
                <div className="relative">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {locked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-t-lg">
                      <div className="text-center text-white">
                        <Lock className="h-12 w-12 mx-auto mb-2" />
                        <p className="font-semibold">Requires {game.minPoints} points</p>
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{game.title}</CardTitle>
                      <CardDescription>{game.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {isGameCompleted(game.id) && (
                        <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" data-testid={`icon-completed-game-${game.id}`} />
                      )}
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Trophy className="h-4 w-4" />
                      <span>{game.points} pts</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{game.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{game.players}</span>
                    </div>
                  </div>
                  {locked ? (
                    <Button className="w-full" disabled data-testid={`button-play-${game.id}`}>
                      <Lock className="h-4 w-4 mr-2" />
                      Locked
                    </Button>
                  ) : (
                    <Link href={`/game/${game.id}`}>
                      <Button className="w-full" data-testid={`button-play-${game.id}`}>
                        {game.status}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {completed ? (
                    <ContextMenuItem onClick={() => markIncompleteMutation.mutate(game.id)} data-testid={`context-unmark-${game.id}`}>
                      <XCircle className="h-4 w-4 mr-2 text-red-500" />
                      Mark as Incomplete
                    </ContextMenuItem>
                  ) : (
                    <ContextMenuItem onClick={() => markCompleteMutation.mutate(game.id)} data-testid={`context-mark-${game.id}`}>
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Mark as Complete
                    </ContextMenuItem>
                  )}
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Group & Challenge Games</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredGroupGames.map((game) => {
            const locked = isGameLocked(game.minPoints);
            const completed = isGameCompleted(game.id);
            return (
              <ContextMenu key={game.id}>
                <ContextMenuTrigger asChild>
                  <Card className={`hover-elevate border-primary/30 ${locked ? 'opacity-75' : ''} ${completed ? 'border-green-500' : ''}`} data-testid={`game-${game.id}`}>
                <div className="relative">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {locked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-t-lg">
                      <div className="text-center text-white">
                        <Lock className="h-12 w-12 mx-auto mb-2" />
                        <p className="font-semibold">Requires {game.minPoints} points</p>
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>{game.title}</CardTitle>
                        {game.type === "Group" && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            <Users className="h-3 w-3 mr-1" />
                            Team
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{game.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {isGameCompleted(game.id) && (
                        <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" data-testid={`icon-completed-game-${game.id}`} />
                      )}
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Trophy className="h-4 w-4" />
                      <span>{game.points} pts</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{game.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{game.players}</span>
                    </div>
                  </div>
                  {locked ? (
                    <Button className="w-full" disabled data-testid={`button-team-${game.id}`}>
                      <Lock className="h-4 w-4 mr-2" />
                      Locked
                    </Button>
                  ) : (
                    <Link href={`/game/${game.id}`}>
                      <Button className="w-full" variant="default" data-testid={`button-team-${game.id}`}>
                        {game.status}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {completed ? (
                    <ContextMenuItem onClick={() => markIncompleteMutation.mutate(game.id)} data-testid={`context-unmark-${game.id}`}>
                      <XCircle className="h-4 w-4 mr-2 text-red-500" />
                      Mark as Incomplete
                    </ContextMenuItem>
                  ) : (
                    <ContextMenuItem onClick={() => markCompleteMutation.mutate(game.id)} data-testid={`context-mark-${game.id}`}>
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Mark as Complete
                    </ContextMenuItem>
                  )}
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </div>
      </div>
    </div>
  );
}

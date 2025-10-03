import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Users, Trophy, Clock, Star } from "lucide-react";
import { Link } from "wouter";

export default function Games() {
  const individualGames = [
    {
      id: 1,
      title: "Waste Sorting Challenge",
      description: "Sort waste items into correct bins before time runs out!",
      type: "Individual",
      difficulty: "Easy",
      points: 100,
      duration: "5 min",
      players: "1",
      status: "Play Now"
    },
    {
      id: 2,
      title: "Carbon Footprint Quest",
      description: "Make daily choices and track your carbon impact",
      type: "Individual",
      difficulty: "Medium",
      points: 150,
      duration: "10 min",
      players: "1",
      status: "Play Now"
    },
    {
      id: 3,
      title: "Water Conservation Puzzle",
      description: "Solve puzzles to fix water leaks and save water",
      type: "Individual",
      difficulty: "Medium",
      points: 120,
      duration: "8 min",
      players: "1",
      status: "Play Now"
    },
    {
      id: 4,
      title: "Renewable Energy Builder",
      description: "Build a sustainable energy grid for your city",
      type: "Individual",
      difficulty: "Hard",
      points: 200,
      duration: "15 min",
      players: "1",
      status: "Play Now"
    }
  ];

  const groupGames = [
    {
      id: 5,
      title: "Eco Warriors Battle",
      description: "Team up and compete against other teams in environmental trivia",
      type: "Group",
      difficulty: "Medium",
      points: 250,
      duration: "20 min",
      players: "2-4 per team",
      status: "Find Team"
    },
    {
      id: 6,
      title: "Community Cleanup Race",
      description: "Coordinate with team to clean virtual community fastest",
      type: "Group",
      difficulty: "Easy",
      points: 200,
      duration: "15 min",
      players: "3-6",
      status: "Find Team"
    },
    {
      id: 7,
      title: "Climate Crisis Response",
      description: "Work together to solve environmental emergencies",
      type: "Group",
      difficulty: "Hard",
      points: 300,
      duration: "25 min",
      players: "4-8",
      status: "Find Team"
    }
  ];

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

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Gamepad2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-display text-3xl font-bold">Interactive Games</h1>
          <p className="text-muted-foreground">Learn environmental concepts through fun, engaging games</p>
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
          {individualGames.map((game) => (
            <Card key={game.id} className="hover-elevate" data-testid={`game-${game.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="mb-2">{game.title}</CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty}
                  </Badge>
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
                <Link href={`/game/${game.id}`}>
                  <Button className="w-full" data-testid={`button-play-${game.id}`}>
                    {game.status}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Group Games</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {groupGames.map((game) => (
            <Card key={game.id} className="hover-elevate border-primary/30" data-testid={`game-${game.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{game.title}</CardTitle>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Users className="h-3 w-3 mr-1" />
                        Team
                      </Badge>
                    </div>
                    <CardDescription>{game.description}</CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty}
                  </Badge>
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
                <Link href={`/game/${game.id}`}>
                  <Button className="w-full" variant="default" data-testid={`button-team-${game.id}`}>
                    {game.status}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

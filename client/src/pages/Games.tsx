import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gamepad2, Users, Trophy, Clock, Star, AlertTriangle, Shield, Lock } from "lucide-react";
import { Link } from "wouter";
import wasteSortingImage from "@assets/stock_images/waste_segregation_so_871ae14e.jpg";
import solarEnergyImage from "@assets/stock_images/solar_energy_panels__c1f1b8c7.jpg";
import waterConservationImage from "@assets/stock_images/water_conservation_c_fe482b3a.jpg";
import treePlantingImage from "@assets/stock_images/tree_planting_hands__ffbd7be4.jpg";
import biodiversityImage from "@assets/stock_images/indian_forest_biodiv_e9bbd8eb.jpg";

export default function Games() {
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const userPoints = 2450;

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
      status: "Play Now",
      image: wasteSortingImage,
      minPoints: 0
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
      status: "Play Now",
      image: solarEnergyImage,
      minPoints: 2500
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
      status: "Play Now",
      image: waterConservationImage,
      minPoints: 2500
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
      status: "Play Now",
      image: solarEnergyImage,
      minPoints: 5000
    },
    {
      id: 8,
      title: "Disaster Dash",
      description: "Prepare your city for incoming disaster by placing shelters and managing resources",
      type: "Individual",
      difficulty: "Medium",
      points: 250,
      duration: "2 min",
      players: "1",
      status: "Play Now",
      image: biodiversityImage,
      minPoints: 2500
    },
    {
      id: 10,
      title: "Air Quality Monitor",
      description: "Track pollutants and suggest improvements to reduce air pollution in your city",
      type: "Individual",
      difficulty: "Easy",
      points: 110,
      duration: "6 min",
      players: "1",
      status: "Play Now",
      image: wasteSortingImage,
      minPoints: 0
    },
    {
      id: 11,
      title: "Ecosystem Balance",
      description: "Maintain biodiversity by balancing predator-prey relationships in a virtual ecosystem",
      type: "Individual",
      difficulty: "Hard",
      points: 220,
      duration: "12 min",
      players: "1",
      status: "Play Now",
      image: biodiversityImage,
      minPoints: 5000
    },
    {
      id: 12,
      title: "Plastic-Free Life",
      description: "Navigate daily life making choices to eliminate single-use plastics",
      type: "Individual",
      difficulty: "Easy",
      points: 90,
      duration: "5 min",
      players: "1",
      status: "Play Now",
      image: waterConservationImage,
      minPoints: 0
    },
    {
      id: 13,
      title: "Tree Planter Hero",
      description: "Plant and nurture trees in different terrains while managing resources",
      type: "Individual",
      difficulty: "Medium",
      points: 140,
      duration: "9 min",
      players: "1",
      status: "Play Now",
      image: treePlantingImage,
      minPoints: 2500
    },
    {
      id: 14,
      title: "Sustainable City Builder",
      description: "Design an eco-friendly city with green infrastructure and renewable energy",
      type: "Individual",
      difficulty: "Hard",
      points: 280,
      duration: "18 min",
      players: "1",
      status: "Play Now",
      image: solarEnergyImage,
      minPoints: 5000
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
      status: "Find Team",
      image: biodiversityImage,
      minPoints: 2500
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
      status: "Find Team",
      image: wasteSortingImage,
      minPoints: 0
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
      status: "Find Team",
      image: treePlantingImage,
      minPoints: 5000
    },
    {
      id: 9,
      title: "Green Hero Challenge",
      description: "Save a disaster-struck city and its people through quick environmental actions",
      type: "Individual",
      difficulty: "Hard",
      points: 300,
      duration: "3 min",
      players: "1",
      status: "Play Now",
      image: biodiversityImage,
      minPoints: 5000
    },
    {
      id: 15,
      title: "Forest Fire Brigade",
      description: "Team up to prevent and control forest fires by strategically placing resources",
      type: "Group",
      difficulty: "Medium",
      points: 220,
      duration: "18 min",
      players: "3-5",
      status: "Find Team",
      image: biodiversityImage,
      minPoints: 2500
    },
    {
      id: 16,
      title: "Ocean Rescue Mission",
      description: "Collaborate to clean ocean debris and rescue marine animals",
      type: "Group",
      difficulty: "Medium",
      points: 240,
      duration: "20 min",
      players: "2-6",
      status: "Find Team",
      image: waterConservationImage,
      minPoints: 2500
    },
    {
      id: 17,
      title: "Wildlife Conservation Quest",
      description: "Work together to protect endangered species and restore habitats",
      type: "Group",
      difficulty: "Hard",
      points: 320,
      duration: "22 min",
      players: "4-6",
      status: "Find Team",
      image: biodiversityImage,
      minPoints: 5000
    },
    {
      id: 18,
      title: "Green School Challenge",
      description: "Compete with other schools to implement the most eco-friendly initiatives",
      type: "Group",
      difficulty: "Easy",
      points: 180,
      duration: "12 min",
      players: "5-10",
      status: "Find Team",
      image: treePlantingImage,
      minPoints: 0
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

  const filterGames = (games: any[]) => {
    return games.filter(game => {
      const difficultyMatch = difficultyFilter === "all" || game.difficulty === difficultyFilter;
      return difficultyMatch;
    });
  };

  const isGameLocked = (minPoints: number) => userPoints < minPoints;

  const filteredIndividualGames = filterGames(individualGames);
  const filteredGroupGames = filterGames(groupGames);

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
            return (
              <Card key={game.id} className={`hover-elevate ${locked ? 'opacity-75' : ''}`} data-testid={`game-${game.id}`}>
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
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Group & Challenge Games</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredGroupGames.map((game) => {
            const locked = isGameLocked(game.minPoints);
            return (
              <Card key={game.id} className={`hover-elevate border-primary/30 ${locked ? 'opacity-75' : ''}`} data-testid={`game-${game.id}`}>
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
                    <div>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

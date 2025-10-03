import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Droplet, Wind, Zap, Clock, Trophy, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function GreenHeroChallengeGame() {
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [score, setScore] = useState(0);
  const [peopleSaved, setPeopleSaved] = useState(0);
  const [cityHealth, setCityHealth] = useState(20);
  const [resources, setResources] = useState({ water: 50, energy: 50, oxygen: 50 });

  const actions = [
    { 
      id: "purify-water", 
      name: "Purify Water Supply", 
      icon: Droplet, 
      cost: { water: -20, energy: 10 }, 
      benefit: { health: 15, people: 5 }, 
      points: 50,
      color: "text-blue-500"
    },
    { 
      id: "clean-air", 
      name: "Clean Air Pollution", 
      icon: Wind, 
      cost: { oxygen: -15, energy: 15 }, 
      benefit: { health: 10, people: 3 }, 
      points: 40,
      color: "text-cyan-500"
    },
    { 
      id: "restore-power", 
      name: "Restore Clean Energy", 
      icon: Zap, 
      cost: { energy: -25 }, 
      benefit: { health: 12, people: 4 }, 
      points: 45,
      color: "text-yellow-500"
    },
    { 
      id: "medical-aid", 
      name: "Provide Medical Aid", 
      icon: Heart, 
      cost: { water: 10, energy: 10 }, 
      benefit: { health: 20, people: 8 }, 
      points: 60,
      color: "text-red-500"
    },
    { 
      id: "evacuate", 
      name: "Evacuate Citizens", 
      icon: Users, 
      cost: { energy: 20 }, 
      benefit: { people: 10, health: 5 }, 
      points: 55,
      color: "text-green-500"
    },
    { 
      id: "plant-trees", 
      name: "Emergency Tree Planting", 
      icon: Shield, 
      cost: { water: 15, energy: 10 }, 
      benefit: { health: 8, oxygen: 20 }, 
      points: 35,
      color: "text-emerald-500"
    }
  ];

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
        
        setCityHealth((prev) => Math.max(0, prev - 0.5));
        
        if (cityHealth <= 0 && !gameOver) {
          setGameOver(true);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, timeLeft, cityHealth]);

  const handleAction = (action: typeof actions[0]) => {
    let canPerform = true;
    const newResources = { ...resources };

    if (action.cost.water && resources.water + action.cost.water < 0) canPerform = false;
    if (action.cost.energy && resources.energy + action.cost.energy < 0) canPerform = false;
    if (action.cost.oxygen && resources.oxygen + action.cost.oxygen < 0) canPerform = false;

    if (canPerform) {
      if (action.cost.water) newResources.water += action.cost.water;
      if (action.cost.energy) newResources.energy += action.cost.energy;
      if (action.cost.oxygen) newResources.oxygen += action.cost.oxygen;

      if (action.benefit.oxygen) newResources.oxygen = Math.min(100, newResources.oxygen + action.benefit.oxygen);

      setResources(newResources);
      setScore(score + action.points);
      setPeopleSaved(peopleSaved + (action.benefit.people || 0));
      setCityHealth(Math.min(100, cityHealth + action.benefit.health));

      toast({
        title: "Action Successful!",
        description: `${action.name} completed. +${action.points} points!`,
      });
    } else {
      toast({
        title: "Insufficient Resources",
        description: "You don't have enough resources for this action.",
        variant: "destructive",
      });
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setTimeLeft(180);
    setScore(0);
    setPeopleSaved(0);
    setCityHealth(20);
    setResources({ water: 50, energy: 50, oxygen: 50 });
  };

  const getFinalMessage = () => {
    if (cityHealth >= 70 && peopleSaved >= 30) {
      return { title: "True Green Hero!", message: "You saved the city and its people magnificently!", variant: "success" };
    } else if (cityHealth >= 40 || peopleSaved >= 15) {
      return { title: "Good Rescue!", message: "You helped stabilize the city. Keep improving!", variant: "warning" };
    } else {
      return { title: "City in Crisis", message: "More effort needed to save the city effectively.", variant: "danger" };
    }
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl">Green Hero Challenge</CardTitle>
                <p className="text-muted-foreground">Save a disaster-struck city and its people!</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Mission Briefing:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span>🏙️</span>
                  <span>A city is suffering from environmental disaster - save it!</span>
                </li>
                <li className="flex gap-2">
                  <span>⏱️</span>
                  <span>You have 3 minutes to restore the city's health above 70%</span>
                </li>
                <li className="flex gap-2">
                  <span>💧</span>
                  <span>Manage water, energy, and oxygen resources wisely</span>
                </li>
                <li className="flex gap-2">
                  <span>👥</span>
                  <span>Save as many citizens as possible (Target: 30+)</span>
                </li>
                <li className="flex gap-2">
                  <span>⚠️</span>
                  <span>City health decreases over time - act fast!</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Potential Points</p>
                    <p className="text-2xl font-bold">300</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-chart-5 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Time Limit</p>
                    <p className="text-2xl font-bold">3 min</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button onClick={startGame} className="w-full" size="lg" data-testid="button-start-game">
              Start Mission
            </Button>
            <Link href="/games">
              <Button variant="outline" className="w-full" data-testid="button-back">
                Back to Games
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameOver) {
    const result = getFinalMessage();
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Mission Complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-6">
              <Shield className={`h-20 w-20 mx-auto mb-4 ${result.variant === "success" ? "text-chart-4" : "text-destructive"}`} />
              <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
              <p className="text-muted-foreground mb-6">{result.message}</p>
              
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card className="bg-primary/10">
                  <CardContent className="pt-6 text-center">
                    <p className="text-2xl font-bold text-primary">{score}</p>
                    <p className="text-sm text-muted-foreground">Points</p>
                  </CardContent>
                </Card>
                <Card className="bg-chart-4/10">
                  <CardContent className="pt-6 text-center">
                    <p className="text-2xl font-bold text-chart-4">{cityHealth.toFixed(0)}%</p>
                    <p className="text-sm text-muted-foreground">City Health</p>
                  </CardContent>
                </Card>
                <Card className="bg-chart-5/10">
                  <CardContent className="pt-6 text-center">
                    <p className="text-2xl font-bold text-chart-5">{peopleSaved}</p>
                    <p className="text-sm text-muted-foreground">People Saved</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="pt-6 text-center">
                    <p className="text-2xl font-bold">{Math.floor((180 - timeLeft) / 60)}:{((180 - timeLeft) % 60).toString().padStart(2, '0')}</p>
                    <p className="text-sm text-muted-foreground">Time Used</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={startGame} className="flex-1" data-testid="button-play-again">
                Play Again
              </Button>
              <Link href="/games" className="flex-1">
                <Button variant="outline" className="w-full" data-testid="button-back-games">
                  Back to Games
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getHealthColor = (health: number) => {
    if (health >= 70) return "text-chart-4";
    if (health >= 40) return "text-chart-5";
    return "text-destructive";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Green Hero Challenge - Save the City!</CardTitle>
              <p className="text-muted-foreground">Take action to restore the city</p>
            </div>
            <Badge variant="destructive" className="text-lg px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-5">
            <Card className="bg-primary/10">
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{score}</p>
                <p className="text-sm text-muted-foreground">Score</p>
              </CardContent>
            </Card>
            <Card className={cityHealth >= 70 ? "bg-chart-4/10" : cityHealth >= 40 ? "bg-chart-5/10" : "bg-destructive/10"}>
              <CardContent className="pt-6 text-center">
                <p className={`text-2xl font-bold ${getHealthColor(cityHealth)}`}>{cityHealth.toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground">City Health</p>
              </CardContent>
            </Card>
            <Card className="bg-chart-5/10">
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{peopleSaved}</p>
                <p className="text-sm text-muted-foreground">Saved</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/10">
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{resources.water}</p>
                <p className="text-sm text-muted-foreground">Water</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-500/10">
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{resources.energy}</p>
                <p className="text-sm text-muted-foreground">Energy</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">City Health</span>
              <span className={`text-sm font-semibold ${getHealthColor(cityHealth)}`}>{cityHealth.toFixed(0)}%</span>
            </div>
            <Progress value={cityHealth} className="h-3" />
            {cityHealth < 30 && (
              <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Critical condition! Act quickly!</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Available Actions:</h3>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <Card key={action.id} className="hover-elevate">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center ${action.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{action.name}</h4>
                          <p className="text-xs text-muted-foreground">+{action.points} pts</p>
                        </div>
                      </div>
                      <div className="text-xs space-y-1 mb-3 text-muted-foreground">
                        {action.cost.water && <div>💧 Water: {action.cost.water > 0 ? '+' : ''}{action.cost.water}</div>}
                        {action.cost.energy && <div>⚡ Energy: {action.cost.energy > 0 ? '+' : ''}{action.cost.energy}</div>}
                        {action.cost.oxygen && <div>💨 Oxygen: {action.cost.oxygen > 0 ? '+' : ''}{action.cost.oxygen}</div>}
                      </div>
                      <Button
                        onClick={() => handleAction(action)}
                        size="sm"
                        className="w-full"
                        data-testid={`button-action-${action.id}`}
                      >
                        Perform Action
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

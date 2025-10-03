import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Home, Users, Package, Clock, Shield, CheckCircle, XCircle, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function DisasterDashGame() {
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);
  const [resources, setResources] = useState({
    shelters: 0,
    foodSupply: 0,
    waterTanks: 0,
    medicalKits: 0
  });
  const [budget, setBudget] = useState(1000);
  const [preparednessLevel, setPreparednessLevel] = useState(0);

  const items = [
    { id: "shelter", name: "Emergency Shelter", cost: 200, icon: Home, points: 50, prep: 25 },
    { id: "food", name: "Food Supply", cost: 100, icon: Package, points: 30, prep: 15 },
    { id: "water", name: "Water Tank", cost: 150, icon: Package, points: 40, prep: 20 },
    { id: "medical", name: "Medical Kit", cost: 120, icon: Shield, points: 35, prep: 18 }
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
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, timeLeft]);

  const handlePurchase = (itemId: string, cost: number, points: number, prep: number) => {
    if (budget >= cost) {
      setBudget(budget - cost);
      setScore(score + points);
      setPreparednessLevel(Math.min(100, preparednessLevel + prep));
      
      switch (itemId) {
        case "shelter":
          setResources({ ...resources, shelters: resources.shelters + 1 });
          break;
        case "food":
          setResources({ ...resources, foodSupply: resources.foodSupply + 1 });
          break;
        case "water":
          setResources({ ...resources, waterTanks: resources.waterTanks + 1 });
          break;
        case "medical":
          setResources({ ...resources, medicalKits: resources.medicalKits + 1 });
          break;
      }

      toast({
        title: "Resource Added!",
        description: `You've added a resource to your disaster preparation.`,
      });
    } else {
      toast({
        title: "Insufficient Budget",
        description: "You don't have enough budget for this item.",
        variant: "destructive",
      });
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setTimeLeft(120);
    setScore(0);
    setResources({ shelters: 0, foodSupply: 0, waterTanks: 0, medicalKits: 0 });
    setBudget(1000);
    setPreparednessLevel(0);
  };

  const getFinalMessage = () => {
    if (preparednessLevel >= 80) {
      return { title: "Excellent Preparation!", message: "Your city is well-protected from the disaster!", variant: "success" };
    } else if (preparednessLevel >= 50) {
      return { title: "Good Effort!", message: "Your city has decent protection, but could be better.", variant: "warning" };
    } else {
      return { title: "Needs Improvement", message: "Your city needs more preparation for disasters.", variant: "danger" };
    }
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <CardTitle className="text-2xl">Disaster Dash</CardTitle>
                <p className="text-muted-foreground">Prepare your city for incoming disaster!</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">How to Play:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span>⏱️</span>
                  <span>You have 2 minutes to prepare your city before disaster strikes</span>
                </li>
                <li className="flex gap-2">
                  <span>💰</span>
                  <span>Budget: 1000 coins to spend on resources</span>
                </li>
                <li className="flex gap-2">
                  <span>🏠</span>
                  <span>Build shelters, stock supplies, and prepare medical kits</span>
                </li>
                <li className="flex gap-2">
                  <span>🎯</span>
                  <span>Reach 80%+ preparedness level for excellent protection!</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Potential Points</p>
                    <p className="text-2xl font-bold">250</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-chart-5 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Time Limit</p>
                    <p className="text-2xl font-bold">2 min</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button onClick={startGame} className="w-full" size="lg" data-testid="button-start-game">
              Start Preparation
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
            <CardTitle className="text-center text-2xl">Disaster Strike Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-6">
              {result.variant === "success" ? (
                <CheckCircle className="h-20 w-20 text-chart-4 mx-auto mb-4" />
              ) : (
                <AlertTriangle className="h-20 w-20 text-destructive mx-auto mb-4" />
              )}
              <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
              <p className="text-muted-foreground mb-6">{result.message}</p>
              
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card className="bg-primary/10">
                  <CardContent className="pt-6 text-center">
                    <p className="text-3xl font-bold text-primary">{score}</p>
                    <p className="text-sm text-muted-foreground">Points Earned</p>
                  </CardContent>
                </Card>
                <Card className="bg-chart-4/10">
                  <CardContent className="pt-6 text-center">
                    <p className="text-3xl font-bold text-chart-4">{preparednessLevel}%</p>
                    <p className="text-sm text-muted-foreground">Preparedness</p>
                  </CardContent>
                </Card>
                <Card className="bg-chart-5/10">
                  <CardContent className="pt-6 text-center">
                    <p className="text-3xl font-bold text-chart-5">{budget}</p>
                    <p className="text-sm text-muted-foreground">Budget Left</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2 text-left">
                <h3 className="font-semibold">Resources Deployed:</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded">
                    <Home className="h-5 w-5" />
                    <span>Shelters: {resources.shelters}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded">
                    <Package className="h-5 w-5" />
                    <span>Food Supply: {resources.foodSupply}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded">
                    <Package className="h-5 w-5" />
                    <span>Water Tanks: {resources.waterTanks}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded">
                    <Shield className="h-5 w-5" />
                    <span>Medical Kits: {resources.medicalKits}</span>
                  </div>
                </div>
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Disaster Dash - Prepare Your City!</CardTitle>
              <p className="text-muted-foreground">Buy resources before time runs out</p>
            </div>
            <Badge variant="destructive" className="text-lg px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-primary/10">
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{score}</p>
                <p className="text-sm text-muted-foreground">Score</p>
              </CardContent>
            </Card>
            <Card className="bg-chart-5/10">
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{budget}</p>
                <p className="text-sm text-muted-foreground">Budget</p>
              </CardContent>
            </Card>
            <Card className="bg-chart-4/10">
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{preparednessLevel}%</p>
                <p className="text-sm text-muted-foreground">Prepared</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">
                  {resources.shelters + resources.foodSupply + resources.waterTanks + resources.medicalKits}
                </p>
                <p className="text-sm text-muted-foreground">Resources</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Preparedness Level</span>
              <span className="text-sm text-muted-foreground">{preparednessLevel}%</span>
            </div>
            <Progress value={preparednessLevel} className="h-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} className="hover-elevate">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">+{item.points} points</p>
                        </div>
                      </div>
                      <Badge variant="secondary">₹{item.cost}</Badge>
                    </div>
                    <Button
                      onClick={() => handlePurchase(item.id, item.cost, item.points, item.prep)}
                      disabled={budget < item.cost}
                      className="w-full"
                      data-testid={`button-buy-${item.id}`}
                    >
                      {budget >= item.cost ? "Purchase" : "Insufficient Budget"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

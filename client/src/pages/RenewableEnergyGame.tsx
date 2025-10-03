import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sun, Wind, Droplets, Zap, Trophy, Users } from "lucide-react";

interface EnergySource {
  id: string;
  name: string;
  icon: any;
  cost: number;
  output: number;
  description: string;
  color: string;
}

export default function RenewableEnergyGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [budget, setBudget] = useState(1000);
  const [energyOutput, setEnergyOutput] = useState(0);
  const [energyDemand] = useState(500);
  const [installations, setInstallations] = useState<{[key: string]: number}>({});

  const energySources: EnergySource[] = [
    {
      id: "solar",
      name: "Solar Panels",
      icon: Sun,
      cost: 150,
      output: 50,
      description: "Clean energy from sunlight",
      color: "text-yellow-500"
    },
    {
      id: "wind",
      name: "Wind Turbine",
      icon: Wind,
      cost: 200,
      output: 80,
      description: "Harness wind power",
      color: "text-blue-500"
    },
    {
      id: "hydro",
      name: "Hydro Power",
      icon: Droplets,
      cost: 300,
      output: 120,
      description: "Water-based energy",
      color: "text-cyan-500"
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setBudget(1000);
    setEnergyOutput(0);
    setInstallations({});
  };

  const installSource = (source: EnergySource) => {
    if (budget >= source.cost) {
      setBudget(budget - source.cost);
      setEnergyOutput(energyOutput + source.output);
      setInstallations({
        ...installations,
        [source.id]: (installations[source.id] || 0) + 1
      });
    }
  };

  const completeGame = () => {
    setGameOver(true);
  };

  const getPerformance = () => {
    const percentage = (energyOutput / energyDemand) * 100;
    if (percentage >= 100) return { 
      text: "Perfect Grid! ⚡", 
      color: "text-green-600", 
      message: `Excellent! You met 100% of the energy demand with ${budget} coins to spare!` 
    };
    if (percentage >= 80) return { 
      text: "Great Job! 🌟", 
      color: "text-blue-600", 
      message: `You met ${percentage.toFixed(0)}% of the energy demand. Almost there!` 
    };
    if (percentage >= 50) return { 
      text: "Good Effort! 👍", 
      color: "text-yellow-600", 
      message: `You met ${percentage.toFixed(0)}% of the demand. Keep building!` 
    };
    return { 
      text: "Keep Trying! 💪", 
      color: "text-orange-600", 
      message: `Only ${percentage.toFixed(0)}% demand met. You need more renewable sources!` 
    };
  };

  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="h-10 w-10 text-yellow-500" />
              <div>
                <CardTitle className="text-3xl">Renewable Energy Builder</CardTitle>
                <p className="text-muted-foreground mt-2">Build a sustainable energy grid for your city</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">How to Play:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• You have 1000 coins to build your energy grid</li>
                <li>• Install solar panels, wind turbines, and hydro power</li>
                <li>• Meet the city's energy demand of 500 units</li>
                <li>• Each source has different cost and output</li>
                <li>• Plan wisely to maximize efficiency!</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="font-semibold">Earn 200 eco points</span>
            </div>
            <Button onClick={startGame} className="w-full" size="lg" data-testid="button-start-game">
              Start Building
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameOver) {
    const performance = getPerformance();
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Grid Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className={`text-4xl font-bold ${performance.color}`}>{performance.text}</p>
              <p className="text-muted-foreground">{performance.message}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{energyOutput}</p>
                  <p className="text-sm text-muted-foreground">Energy Output</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{energyDemand}</p>
                  <p className="text-sm text-muted-foreground">Demand</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{budget}</p>
                  <p className="text-sm text-muted-foreground">Coins Left</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Your Energy Mix:</h3>
              {energySources.map(source => {
                const Icon = source.icon;
                const count = installations[source.id] || 0;
                return count > 0 ? (
                  <div key={source.id} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${source.color}`} />
                      <span className="font-medium">{source.name}</span>
                    </div>
                    <Badge variant="secondary">{count}x (Output: {count * source.output})</Badge>
                  </div>
                ) : null;
              })}
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Environmental Impact:</h3>
              <p className="text-sm text-muted-foreground">
                By using 100% renewable energy, you've prevented approximately {Math.round(energyOutput * 0.5)} kg 
                of CO2 emissions compared to fossil fuels! 🌍
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={startGame} className="flex-1" data-testid="button-play-again">
                Build Again
              </Button>
              <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
                Back to Games
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const demandProgress = (energyOutput / energyDemand) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Renewable Energy Builder</CardTitle>
              <div className="flex gap-4">
                <Badge variant="outline" className="text-lg">
                  💰 {budget} coins
                </Badge>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Energy Demand Progress</span>
                <span className="font-semibold">{energyOutput} / {energyDemand} units</span>
              </div>
              <Progress value={Math.min(demandProgress, 100)} className="h-3" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {energySources.map((source) => {
              const Icon = source.icon;
              const count = installations[source.id] || 0;
              const canAfford = budget >= source.cost;
              
              return (
                <Card key={source.id} className={!canAfford ? "opacity-50" : ""}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <Icon className={`h-8 w-8 ${source.color}`} />
                      {count > 0 && (
                        <Badge variant="secondary">{count}x</Badge>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{source.name}</h3>
                      <p className="text-xs text-muted-foreground">{source.description}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cost: {source.cost} 💰</span>
                      <span className="text-primary">+{source.output} ⚡</span>
                    </div>
                    <Button
                      onClick={() => installSource(source)}
                      disabled={!canAfford}
                      className="w-full"
                      size="sm"
                      data-testid={`install-${source.id}`}
                    >
                      {canAfford ? "Install" : "Not Enough Coins"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button
            onClick={completeGame}
            className="w-full"
            size="lg"
            variant={energyOutput >= energyDemand ? "default" : "outline"}
            data-testid="button-complete"
          >
            {energyOutput >= energyDemand ? "Complete Grid ✓" : "Finish Building"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

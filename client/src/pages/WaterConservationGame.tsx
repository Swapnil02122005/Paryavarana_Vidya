import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplet, Trophy, Clock, Target } from "lucide-react";

interface Leak {
  id: number;
  position: { x: number; y: number };
  fixed: boolean;
}

export default function WaterConservationGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [leaks, setLeaks] = useState<Leak[]>([]);
  const [waterSaved, setWaterSaved] = useState(0);

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setGameOver(true);
    }
  }, [timeLeft, gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver && leaks.length < 8) {
      const interval = setInterval(() => {
        addNewLeak();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver, leaks]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setLeaks([]);
    setWaterSaved(0);
    addNewLeak();
  };

  const addNewLeak = () => {
    const newLeak: Leak = {
      id: Date.now(),
      position: {
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10
      },
      fixed: false
    };
    setLeaks(prev => [...prev, newLeak]);
  };

  const fixLeak = (leakId: number) => {
    setLeaks(prev => prev.map(leak => 
      leak.id === leakId ? { ...leak, fixed: true } : leak
    ));
    setScore(score + 50);
    setWaterSaved(waterSaved + 100);
  };

  const getPerformanceMessage = () => {
    if (waterSaved >= 800) return { text: "Water Hero! 💧", color: "text-blue-600", message: "Amazing! You saved tons of water!" };
    if (waterSaved >= 500) return { text: "Good Job! 👍", color: "text-green-600", message: "Great water conservation skills!" };
    if (waterSaved >= 300) return { text: "Nice Try! 🌊", color: "text-yellow-600", message: "You saved some water, keep practicing!" };
    return { text: "Keep Trying! 💪", color: "text-orange-600", message: "Water conservation takes practice!" };
  };

  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Droplet className="h-10 w-10 text-blue-500" />
              <div>
                <CardTitle className="text-3xl">Water Conservation Puzzle</CardTitle>
                <p className="text-muted-foreground mt-2">Fix water leaks and save precious water!</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">How to Play:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Click on water leaks (💧) to fix them quickly</li>
                <li>• New leaks appear every few seconds</li>
                <li>• Each leak fixed saves 100 liters of water</li>
                <li>• Fix as many leaks as possible in 30 seconds</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="font-semibold">Earn 120 eco points</span>
            </div>
            <Button onClick={startGame} className="w-full" size="lg" data-testid="button-start-game">
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameOver) {
    const performance = getPerformanceMessage();
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Game Over!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className={`text-4xl font-bold ${performance.color}`}>{performance.text}</p>
              <p className="text-xl">Water Saved: {waterSaved} liters</p>
              <p className="text-muted-foreground">{performance.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{score}</p>
                  <p className="text-sm text-muted-foreground">Points</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{leaks.filter(l => l.fixed).length}</p>
                  <p className="text-sm text-muted-foreground">Leaks Fixed</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Did You Know?</h3>
              <p className="text-sm text-muted-foreground">
                A single dripping tap can waste up to 15 liters of water per day! 
                That's 5,500 liters per year - enough to fill a small swimming pool!
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={startGame} className="flex-1" data-testid="button-play-again">
                Play Again
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

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Water Conservation Puzzle</CardTitle>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono font-bold">{timeLeft}s</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-blue-500" />
                <span className="font-semibold">{waterSaved}L saved</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative bg-muted rounded-lg h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 to-blue-300/20 dark:from-blue-900/10 dark:to-blue-700/10" />
            {leaks.map((leak) => (
              !leak.fixed && (
                <button
                  key={leak.id}
                  onClick={() => fixLeak(leak.id)}
                  className="absolute text-4xl animate-bounce cursor-pointer hover:scale-125 transition-transform"
                  style={{
                    left: `${leak.position.x}%`,
                    top: `${leak.position.y}%`,
                  }}
                  data-testid={`leak-${leak.id}`}
                >
                  💧
                </button>
              )
            ))}
            {leaks.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <p>Get ready! Leaks will appear...</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Score: {score}</span>
              <span>Fixed: {leaks.filter(l => l.fixed).length}/{leaks.length}</span>
            </div>
            <Progress value={(leaks.filter(l => l.fixed).length / Math.max(leaks.length, 1)) * 100} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

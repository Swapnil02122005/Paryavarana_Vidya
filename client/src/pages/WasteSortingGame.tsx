import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Target, RotateCcw, Home } from "lucide-react";
import { Link } from "wouter";

interface WasteItem {
  id: number;
  name: string;
  type: "organic" | "recyclable" | "hazardous" | "general";
  emoji: string;
}

export default function WasteSortingGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(null);
  const [itemsSorted, setItemsSorted] = useState(0);
  const [correctSorts, setCorrectSorts] = useState(0);

  const wasteItems: WasteItem[] = [
    { id: 1, name: "Banana Peel", type: "organic", emoji: "🍌" },
    { id: 2, name: "Plastic Bottle", type: "recyclable", emoji: "🍾" },
    { id: 3, name: "Battery", type: "hazardous", emoji: "🔋" },
    { id: 4, name: "Food Scraps", type: "organic", emoji: "🍎" },
    { id: 5, name: "Newspaper", type: "recyclable", emoji: "📰" },
    { id: 6, name: "Paint Can", type: "hazardous", emoji: "🎨" },
    { id: 7, name: "Broken Glass", type: "general", emoji: "🔨" },
    { id: 8, name: "Cardboard Box", type: "recyclable", emoji: "📦" },
    { id: 9, name: "Vegetable Waste", type: "organic", emoji: "🥬" },
    { id: 10, name: "Cleaning Chemical", type: "hazardous", emoji: "🧪" },
    { id: 11, name: "Aluminum Can", type: "recyclable", emoji: "🥫" },
    { id: 12, name: "Used Tissues", type: "general", emoji: "🧻" },
    { id: 13, name: "Garden Waste", type: "organic", emoji: "🌿" },
    { id: 14, name: "Glass Bottle", type: "recyclable", emoji: "🍶" },
    { id: 15, name: "Electronics", type: "hazardous", emoji: "📱" },
  ];

  const bins = [
    { type: "organic", name: "Organic Waste", color: "bg-chart-4/20 border-chart-4", icon: "🌱" },
    { type: "recyclable", name: "Recyclable", color: "bg-primary/20 border-primary", icon: "♻️" },
    { type: "hazardous", name: "Hazardous", color: "bg-destructive/20 border-destructive", icon: "⚠️" },
    { type: "general", name: "General Waste", color: "bg-muted/20 border-muted-foreground", icon: "🗑️" },
  ];

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setGameOver(true);
    }
  }, [timeLeft, gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setItemsSorted(0);
    setCorrectSorts(0);
    getNewItem();
  };

  const getNewItem = () => {
    const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)];
    setCurrentItem(randomItem);
  };

  const handleSort = (binType: string) => {
    if (!currentItem || gameOver) return;

    const isCorrect = currentItem.type === binType;
    
    if (isCorrect) {
      setScore(score + 10);
      setCorrectSorts(correctSorts + 1);
    } else {
      setScore(Math.max(0, score - 5));
    }

    setItemsSorted(itemsSorted + 1);
    getNewItem();
  };

  const accuracy = itemsSorted > 0 ? Math.round((correctSorts / itemsSorted) * 100) : 0;

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl">🎮 Waste Sorting Challenge</CardTitle>
              <Link href="/games">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Games
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">♻️</div>
              <h2 className="text-2xl font-bold">How to Play</h2>
              <div className="text-left max-w-2xl mx-auto space-y-3">
                <p className="text-muted-foreground">
                  <strong>Objective:</strong> Sort waste items into the correct bins before time runs out!
                </p>
                <div className="grid gap-3 mt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <p className="font-semibold">Organic Waste</p>
                      <p className="text-sm text-muted-foreground">Food scraps, garden waste, biodegradable items</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">♻️</span>
                    <div>
                      <p className="font-semibold">Recyclable</p>
                      <p className="text-sm text-muted-foreground">Paper, plastic bottles, glass, aluminum cans</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="font-semibold">Hazardous</p>
                      <p className="text-sm text-muted-foreground">Batteries, chemicals, electronics, paint</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🗑️</span>
                    <div>
                      <p className="font-semibold">General Waste</p>
                      <p className="text-sm text-muted-foreground">Items that don't fit other categories</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/10 p-4 rounded-md mt-4">
                  <p className="text-sm">
                    <strong>Scoring:</strong> +10 points for correct sorting, -5 points for incorrect sorting
                  </p>
                </div>
              </div>
            </div>
            <Button className="w-full text-lg py-6" onClick={startGame} data-testid="button-start-game">
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameOver) {
    const earned = score >= 100;
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Game Over!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{earned ? "🏆" : "🎯"}</div>
              <h2 className="text-4xl font-bold mb-2">{score} Points</h2>
              <p className="text-muted-foreground">You sorted {itemsSorted} items with {accuracy}% accuracy</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-muted/50">
                <CardContent className="pt-6 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{score}</p>
                  <p className="text-sm text-muted-foreground">Total Score</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="pt-6 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-chart-4" />
                  <p className="text-2xl font-bold">{accuracy}%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="pt-6 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-chart-5" />
                  <p className="text-2xl font-bold">{itemsSorted}</p>
                  <p className="text-sm text-muted-foreground">Items Sorted</p>
                </CardContent>
              </Card>
            </div>

            {earned && (
              <div className="bg-primary/10 border border-primary/20 rounded-md p-4">
                <p className="text-center font-semibold text-primary">
                  🎉 Great job! You've earned 100 eco-points!
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button className="flex-1" onClick={startGame} data-testid="button-play-again">
                <RotateCcw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
              <Link href="/games" className="flex-1">
                <Button variant="outline" className="w-full" data-testid="button-back-games">
                  <Home className="h-4 w-4 mr-2" />
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge className="text-lg py-1 px-3">
            <Trophy className="h-4 w-4 mr-2" />
            {score} pts
          </Badge>
          <Badge className="text-lg py-1 px-3" variant="secondary">
            <Clock className="h-4 w-4 mr-2" />
            {timeLeft}s
          </Badge>
        </div>
        <Link href="/games">
          <Button variant="outline" size="sm">
            <Home className="h-4 w-4 mr-2" />
            Exit Game
          </Button>
        </Link>
      </div>

      <Progress value={(timeLeft / 60) * 100} className="h-2" />

      {currentItem && (
        <Card className="bg-gradient-to-br from-primary/10 to-chart-4/10">
          <CardHeader>
            <CardTitle className="text-center">Sort this item:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-8xl mb-4">{currentItem.emoji}</div>
              <h3 className="text-3xl font-bold">{currentItem.name}</h3>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bins.map((bin) => (
          <Card
            key={bin.type}
            className={`${bin.color} border-2 cursor-pointer hover-elevate active-elevate-2 transition-all`}
            onClick={() => handleSort(bin.type)}
            data-testid={`bin-${bin.type}`}
          >
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-2">{bin.icon}</div>
              <p className="font-semibold text-sm">{bin.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Items sorted: {itemsSorted} | Accuracy: {accuracy}%
      </div>
    </div>
  );
}

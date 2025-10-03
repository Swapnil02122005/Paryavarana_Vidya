import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Clock, Sparkles } from "lucide-react";

interface TrashItem {
  id: number;
  type: string;
  emoji: string;
  points: number;
  position: { x: number; y: number };
  collected: boolean;
}

export default function CleanupRaceGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [teamScore, setTeamScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);
  const [itemsCollected, setItemsCollected] = useState(0);

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setGameOver(true);
    }
  }, [timeLeft, gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        const opponentCollect = Math.random() > 0.6;
        if (opponentCollect) {
          setOpponentScore(prev => prev + Math.floor(Math.random() * 15) + 5);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver]);

  const trashTypes = [
    { type: "plastic", emoji: "🍾", points: 10 },
    { type: "paper", emoji: "📄", points: 5 },
    { type: "can", emoji: "🥫", points: 8 },
    { type: "bottle", emoji: "🧃", points: 10 },
    { type: "bag", emoji: "🛍️", points: 7 },
    { type: "cup", emoji: "🥤", points: 6 }
  ];

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setTimeLeft(45);
    setTeamScore(0);
    setOpponentScore(0);
    setItemsCollected(0);
    generateTrash();
  };

  const generateTrash = () => {
    const items: TrashItem[] = [];
    for (let i = 0; i < 15; i++) {
      const trashType = trashTypes[Math.floor(Math.random() * trashTypes.length)];
      items.push({
        id: i,
        ...trashType,
        position: {
          x: Math.random() * 85 + 5,
          y: Math.random() * 75 + 10
        },
        collected: false
      });
    }
    setTrashItems(items);
  };

  const collectTrash = (itemId: number) => {
    const item = trashItems.find(t => t.id === itemId);
    if (item && !item.collected) {
      setTrashItems(prev => prev.map(t => 
        t.id === itemId ? { ...t, collected: true } : t
      ));
      setTeamScore(teamScore + item.points);
      setItemsCollected(itemsCollected + 1);
    }
  };

  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="h-10 w-10 text-green-500" />
              <div>
                <CardTitle className="text-3xl">Community Cleanup Race</CardTitle>
                <p className="text-muted-foreground mt-2">Clean the community faster than other teams!</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">How to Play:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Click on trash items to collect them</li>
                <li>• Different items give different points</li>
                <li>• Compete against other teams</li>
                <li>• Clean as much as possible in 45 seconds</li>
                <li>• Team with most points wins!</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Your Team: Clean Squad</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Opponent: Green Team</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="font-semibold">Earn 200 eco points</span>
            </div>
            <Button onClick={startGame} className="w-full" size="lg" data-testid="button-start-game">
              Start Cleanup
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameOver) {
    const won = teamScore > opponentScore;
    const tie = teamScore === opponentScore;
    
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Cleanup Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className={`text-4xl font-bold ${won ? 'text-green-600' : tie ? 'text-yellow-600' : 'text-orange-600'}`}>
                {won ? '🏆 Team Victory!' : tie ? '🤝 Tie Game!' : '💪 Good Teamwork!'}
              </p>
              <p className="text-muted-foreground">
                {won ? 'Your team cleaned the most trash!' : tie ? 'Both teams did equally well!' : 'The other team was faster!'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className={won ? "border-2 border-green-500" : ""}>
                <CardContent className="pt-6 text-center">
                  <Sparkles className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{teamScore}</p>
                  <p className="text-sm text-muted-foreground">Clean Squad</p>
                  <p className="text-xs text-muted-foreground mt-1">{itemsCollected} items</p>
                  {won && <Badge className="mt-2 bg-green-600">Winner!</Badge>}
                </CardContent>
              </Card>
              <Card className={!won && !tie ? "border-2 border-green-500" : ""}>
                <CardContent className="pt-6 text-center">
                  <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-2xl font-bold">{opponentScore}</p>
                  <p className="text-sm text-muted-foreground">Green Team</p>
                  <p className="text-xs text-muted-foreground mt-1">~{Math.floor(opponentScore / 7)} items</p>
                  {!won && !tie && <Badge className="mt-2 bg-green-600">Winner!</Badge>}
                </CardContent>
              </Card>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Environmental Impact:</h3>
              <p className="text-sm text-muted-foreground">
                Together, both teams cleaned {itemsCollected + Math.floor(opponentScore / 7)} items! 
                This prevents pollution and protects wildlife. Great teamwork! 🌍
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={startGame} className="flex-1" data-testid="button-play-again">
                Race Again
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

  const totalTrash = trashItems.length;
  const progress = (itemsCollected / totalTrash) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Community Cleanup Race</CardTitle>
              <Badge variant="outline" className="text-lg">
                <Clock className="h-4 w-4 mr-1" />
                {timeLeft}s
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-950/20 p-2 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Clean Squad</p>
                <p className="text-2xl font-bold text-green-600">{teamScore}</p>
              </div>
              <div className="bg-muted p-2 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Green Team</p>
                <p className="text-2xl font-bold">{opponentScore}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative bg-gradient-to-b from-green-100 to-green-50 dark:from-green-950/20 dark:to-green-900/10 rounded-lg h-96 overflow-hidden border-2">
            {trashItems.map((item) => (
              !item.collected && (
                <button
                  key={item.id}
                  onClick={() => collectTrash(item.id)}
                  className="absolute text-3xl cursor-pointer hover:scale-125 transition-transform animate-pulse"
                  style={{
                    left: `${item.position.x}%`,
                    top: `${item.position.y}%`,
                  }}
                  data-testid={`trash-${item.id}`}
                >
                  {item.emoji}
                </button>
              )
            ))}
            {itemsCollected === totalTrash && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                <div className="text-center">
                  <p className="text-4xl mb-2">✨</p>
                  <p className="font-bold text-green-600">Area Cleaned!</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Items Collected: {itemsCollected}/{totalTrash}</span>
              <span>Score: {teamScore}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Leaf, Car, Utensils, Home, Zap, Trophy } from "lucide-react";

interface Choice {
  id: number;
  scenario: string;
  options: {
    text: string;
    impact: number;
    icon: any;
  }[];
}

export default function CarbonFootprintGame() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [carbonScore, setCarbonScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);

  const scenarios: Choice[] = [
    {
      id: 1,
      scenario: "How do you commute to school/college?",
      options: [
        { text: "Walk or Bicycle", impact: -20, icon: Car },
        { text: "Public Transport", impact: -10, icon: Car },
        { text: "Carpool", impact: 5, icon: Car },
        { text: "Personal Car", impact: 20, icon: Car }
      ]
    },
    {
      id: 2,
      scenario: "What's your typical meal choice?",
      options: [
        { text: "Plant-based meal", impact: -15, icon: Utensils },
        { text: "Vegetarian meal", impact: -5, icon: Utensils },
        { text: "Chicken or fish", impact: 10, icon: Utensils },
        { text: "Red meat (Beef/Lamb)", impact: 25, icon: Utensils }
      ]
    },
    {
      id: 3,
      scenario: "How do you manage home energy?",
      options: [
        { text: "Solar panels + LED lights", impact: -25, icon: Zap },
        { text: "Energy-efficient appliances", impact: -10, icon: Zap },
        { text: "Regular usage", impact: 10, icon: Zap },
        { text: "AC/Heater always on", impact: 30, icon: Zap }
      ]
    },
    {
      id: 4,
      scenario: "How often do you buy new things?",
      options: [
        { text: "Rarely, repair & reuse", impact: -20, icon: Home },
        { text: "Only when needed", impact: 0, icon: Home },
        { text: "Monthly shopping", impact: 15, icon: Home },
        { text: "Frequent online orders", impact: 35, icon: Home }
      ]
    },
    {
      id: 5,
      scenario: "What's your water usage like?",
      options: [
        { text: "Rainwater harvest + minimal use", impact: -15, icon: Leaf },
        { text: "Conscious water saving", impact: -5, icon: Leaf },
        { text: "Normal usage", impact: 10, icon: Leaf },
        { text: "Long showers, no restrictions", impact: 25, icon: Leaf }
      ]
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setCarbonScore(0);
    setCurrentScenario(0);
    setChoices([]);
  };

  const makeChoice = (optionIndex: number) => {
    const option = scenarios[currentScenario].options[optionIndex];
    setCarbonScore(carbonScore + option.impact);
    setChoices([...choices, option.text]);

    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      setGameOver(true);
    }
  };

  const getScoreMessage = () => {
    const finalScore = carbonScore;
    if (finalScore <= -50) return { text: "Eco Champion! 🌟", color: "text-green-600", message: "Your carbon footprint is minimal! Keep up the excellent sustainable lifestyle!" };
    if (finalScore <= -20) return { text: "Green Warrior! 🌱", color: "text-green-500", message: "Great job! You're making conscious environmental choices." };
    if (finalScore <= 20) return { text: "Eco Learner 📚", color: "text-yellow-600", message: "You're on the right track. Small improvements can make a big difference!" };
    if (finalScore <= 50) return { text: "High Impact ⚠️", color: "text-orange-600", message: "Your carbon footprint is significant. Consider more sustainable choices." };
    return { text: "Carbon Alert! 🚨", color: "text-red-600", message: "Your lifestyle has a very high carbon footprint. Time for major changes!" };
  };

  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Leaf className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-3xl">Carbon Footprint Quest</CardTitle>
                <p className="text-muted-foreground mt-2">Make daily choices and discover your carbon impact</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">How to Play:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Answer 5 scenarios about your daily lifestyle</li>
                <li>• Each choice impacts your carbon footprint score</li>
                <li>• Negative scores are better (lower carbon footprint)</li>
                <li>• Learn how your choices affect the environment</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="font-semibold">Earn 150 eco points</span>
            </div>
            <Button onClick={startGame} className="w-full" size="lg" data-testid="button-start-game">
              Start Quest
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameOver) {
    const scoreData = getScoreMessage();
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Quest Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className={`text-4xl font-bold ${scoreData.color}`}>{scoreData.text}</p>
              <p className="text-xl">Carbon Score: {carbonScore}</p>
              <p className="text-muted-foreground">{scoreData.message}</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Your Choices:</h3>
              {scenarios.map((scenario, idx) => (
                <div key={idx} className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">{scenario.scenario}</p>
                  <p className="text-sm text-primary">✓ {choices[idx]}</p>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Tips to Reduce Your Carbon Footprint:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Use public transport or cycle instead of driving</li>
                <li>• Reduce meat consumption, eat more plant-based foods</li>
                <li>• Switch to renewable energy and LED lights</li>
                <li>• Buy less, repair more, and reuse items</li>
                <li>• Conserve water and reduce waste</li>
              </ul>
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

  const currentScenarioData = scenarios[currentScenario];

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Carbon Footprint Quest</CardTitle>
              <Badge variant="outline">
                Scenario {currentScenario + 1} of {scenarios.length}
              </Badge>
            </div>
            <Progress value={((currentScenario) / scenarios.length) * 100} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{currentScenarioData.scenario}</h3>
            <div className="grid gap-3">
              {currentScenarioData.options.map((option, idx) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={idx}
                    onClick={() => makeChoice(idx)}
                    variant="outline"
                    className="h-auto py-4 justify-start text-left"
                    data-testid={`option-${idx}`}
                  >
                    <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>{option.text}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Current Carbon Score: <span className={carbonScore > 0 ? "text-orange-600 font-semibold" : "text-green-600 font-semibold"}>{carbonScore}</span></p>
            <p className="mt-1">(Lower is better!)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

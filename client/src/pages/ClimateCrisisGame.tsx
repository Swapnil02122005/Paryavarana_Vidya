import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Trophy, Heart, Shield } from "lucide-react";

interface Crisis {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  timeLimit: number;
  solutions: {
    text: string;
    effectiveness: number;
    teamworkBonus: boolean;
  }[];
}

export default function ClimateCrisisGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentCrisis, setCurrentCrisis] = useState(0);
  const [earthHealth, setEarthHealth] = useState(100);
  const [teamScore, setTeamScore] = useState(0);
  const [solutionsChosen, setSolutionsChosen] = useState<string[]>([]);

  const crises: Crisis[] = [
    {
      id: 1,
      title: "Wildfire Emergency",
      description: "A massive wildfire is spreading due to extreme heat and drought. Immediate action needed!",
      severity: "Critical",
      timeLimit: 20,
      solutions: [
        { text: "Deploy firefighting teams and aircraft", effectiveness: 60, teamworkBonus: true },
        { text: "Create firebreaks and evacuate residents", effectiveness: 70, teamworkBonus: true },
        { text: "Wait for rain", effectiveness: 20, teamworkBonus: false },
        { text: "Plant new trees immediately", effectiveness: 10, teamworkBonus: false }
      ]
    },
    {
      id: 2,
      title: "Ocean Acidification Alert",
      description: "Rising CO2 levels are making oceans acidic, threatening marine life!",
      severity: "High",
      timeLimit: 25,
      solutions: [
        { text: "Reduce industrial CO2 emissions", effectiveness: 80, teamworkBonus: true },
        { text: "Protect coral reefs and marine habitats", effectiveness: 70, teamworkBonus: true },
        { text: "Add chemicals to neutralize acid", effectiveness: 30, teamworkBonus: false },
        { text: "Do nothing, nature will adapt", effectiveness: 0, teamworkBonus: false }
      ]
    },
    {
      id: 3,
      title: "Urban Air Pollution Crisis",
      description: "AQI reaches hazardous levels! Thousands at risk of respiratory diseases.",
      severity: "High",
      timeLimit: 20,
      solutions: [
        { text: "Implement odd-even vehicle scheme", effectiveness: 65, teamworkBonus: true },
        { text: "Shut down polluting industries temporarily", effectiveness: 75, teamworkBonus: true },
        { text: "Distribute face masks only", effectiveness: 25, teamworkBonus: false },
        { text: "Advise people to stay indoors", effectiveness: 40, teamworkBonus: false }
      ]
    },
    {
      id: 4,
      title: "Severe Water Shortage",
      description: "Reservoirs at critical low levels. Community water supply in danger!",
      severity: "Critical",
      timeLimit: 25,
      solutions: [
        { text: "Implement water rationing and rainwater harvesting", effectiveness: 80, teamworkBonus: true },
        { text: "Build desalination plants and pipelines", effectiveness: 70, teamworkBonus: true },
        { text: "Import water from other regions", effectiveness: 50, teamworkBonus: false },
        { text: "Pray for rain", effectiveness: 10, teamworkBonus: false }
      ]
    },
    {
      id: 5,
      title: "Glacier Melting Emergency",
      description: "Rapid glacier melt threatens flooding and water supply for millions!",
      severity: "Critical",
      timeLimit: 30,
      solutions: [
        { text: "Transition to 100% renewable energy", effectiveness: 85, teamworkBonus: true },
        { text: "Reforestation and carbon capture", effectiveness: 75, teamworkBonus: true },
        { text: "Build protective barriers", effectiveness: 40, teamworkBonus: false },
        { text: "Relocate affected populations", effectiveness: 30, teamworkBonus: false }
      ]
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setCurrentCrisis(0);
    setEarthHealth(100);
    setTeamScore(0);
    setSolutionsChosen([]);
  };

  const chooseSolution = (solutionIndex: number) => {
    const crisis = crises[currentCrisis];
    const solution = crisis.solutions[solutionIndex];
    
    const healthChange = solution.effectiveness - 50;
    const bonusPoints = solution.teamworkBonus ? 100 : 0;
    
    setEarthHealth(Math.max(0, Math.min(100, earthHealth + healthChange)));
    setTeamScore(teamScore + solution.effectiveness + bonusPoints);
    setSolutionsChosen([...solutionsChosen, solution.text]);

    if (currentCrisis < crises.length - 1) {
      setTimeout(() => setCurrentCrisis(currentCrisis + 1), 1500);
    } else {
      setTimeout(() => setGameOver(true), 1500);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      default: return "bg-blue-500";
    }
  };

  const getPerformance = () => {
    if (earthHealth >= 80) return {
      text: "Planet Saved! 🌍",
      color: "text-green-600",
      message: "Excellent teamwork! Your decisions protected Earth and its inhabitants!"
    };
    if (earthHealth >= 60) return {
      text: "Crisis Managed ✅",
      color: "text-blue-600",
      message: "Good job! You handled most crises effectively, but there's room for improvement."
    };
    if (earthHealth >= 40) return {
      text: "Partial Success ⚠️",
      color: "text-yellow-600",
      message: "You averted disaster, but Earth took significant damage. Better planning needed!"
    };
    return {
      text: "Critical Damage 🚨",
      color: "text-red-600",
      message: "Earth is severely damaged. Quick action and better teamwork are essential!"
    };
  };

  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-10 w-10 text-red-500" />
              <div>
                <CardTitle className="text-3xl">Climate Crisis Response</CardTitle>
                <p className="text-muted-foreground mt-2">Work together to solve environmental emergencies</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">How to Play:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Face 5 different climate crisis scenarios</li>
                <li>• Choose the best solution for each crisis</li>
                <li>• Teamwork solutions give bonus points</li>
                <li>• Keep Earth's health above 40%</li>
                <li>• Better decisions = Higher scores!</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-900">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-600">Team Mission: Emergency Response</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You are part of the Global Climate Response Team. Your decisions will determine Earth's future!
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="font-semibold">Earn 300 eco points</span>
            </div>
            <Button onClick={startGame} className="w-full" size="lg" data-testid="button-start-game">
              Start Mission
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
            <CardTitle className="text-2xl text-center">Mission Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className={`text-4xl font-bold ${performance.color}`}>{performance.text}</p>
              <p className="text-muted-foreground">{performance.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Heart className={`h-8 w-8 mx-auto mb-2 ${earthHealth >= 60 ? 'text-green-500' : 'text-red-500'}`} />
                  <p className="text-2xl font-bold">{earthHealth}%</p>
                  <p className="text-sm text-muted-foreground">Earth Health</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{teamScore}</p>
                  <p className="text-sm text-muted-foreground">Team Score</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Your Team's Decisions:</h3>
              {crises.map((crisis, idx) => (
                <div key={idx} className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getSeverityColor(crisis.severity)}>
                      {crisis.severity}
                    </Badge>
                    <span className="font-medium text-sm">{crisis.title}</span>
                  </div>
                  <p className="text-sm text-primary">✓ {solutionsChosen[idx]}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Key Takeaway:</h3>
              <p className="text-sm text-muted-foreground">
                Climate crises require immediate, coordinated action. Teamwork, renewable energy, 
                conservation, and sustainable practices are our best tools to protect Earth! 🌍
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={startGame} className="flex-1" data-testid="button-play-again">
                New Mission
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

  const crisis = crises[currentCrisis];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Climate Crisis Response</CardTitle>
              <Badge className={getSeverityColor(crisis.severity)}>
                {crisis.severity}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Earth Health</span>
                <span className="font-semibold">{earthHealth}%</span>
              </div>
              <Progress value={earthHealth} className={`h-3 ${earthHealth < 40 ? '[&>div]:bg-red-500' : ''}`} />
            </div>
            <Progress value={((currentCrisis + 1) / crises.length) * 100} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border-2 border-red-200 dark:border-red-900">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-2">{crisis.title}</h3>
                <p className="text-muted-foreground">{crisis.description}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Choose Your Response:
            </h4>
            <div className="grid gap-3">
              {crisis.solutions.map((solution, idx) => (
                <Button
                  key={idx}
                  onClick={() => chooseSolution(idx)}
                  variant="outline"
                  className="h-auto py-4 justify-start text-left relative"
                  data-testid={`solution-${idx}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {solution.teamworkBonus && (
                        <Users className="h-4 w-4 text-primary" />
                      )}
                      <span>{solution.text}</span>
                    </div>
                    {solution.teamworkBonus && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        Teamwork Bonus +100
                      </Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Crisis {currentCrisis + 1} of {crises.length} | Score: {teamScore}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

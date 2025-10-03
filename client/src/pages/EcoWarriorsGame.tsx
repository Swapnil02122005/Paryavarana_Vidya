import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Clock, Zap } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

export default function EcoWarriorsGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [teamScore, setTeamScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answered, setAnswered] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What percentage of Earth's water is freshwater?",
      options: ["3%", "10%", "25%", "50%"],
      correct: 0,
      category: "Water"
    },
    {
      id: 2,
      question: "Which gas is primarily responsible for global warming?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: 2,
      category: "Climate"
    },
    {
      id: 3,
      question: "How long does a plastic bottle take to decompose?",
      options: ["10 years", "50 years", "450 years", "1000 years"],
      correct: 2,
      category: "Pollution"
    },
    {
      id: 4,
      question: "Which renewable energy source is most used globally?",
      options: ["Solar", "Wind", "Hydro", "Geothermal"],
      correct: 2,
      category: "Energy"
    },
    {
      id: 5,
      question: "What is the main cause of deforestation in the Amazon?",
      options: ["Wildfires", "Cattle ranching", "Mining", "Tourism"],
      correct: 1,
      category: "Forests"
    },
    {
      id: 6,
      question: "Which country has the highest CO2 emissions per capita?",
      options: ["USA", "China", "India", "Qatar"],
      correct: 3,
      category: "Climate"
    },
    {
      id: 7,
      question: "What is the most recycled material in the world?",
      options: ["Paper", "Plastic", "Glass", "Steel"],
      correct: 3,
      category: "Recycling"
    },
    {
      id: 8,
      question: "How much of the ocean's surface is covered by plastic?",
      options: ["1%", "5%", "10%", "15%"],
      correct: 0,
      category: "Pollution"
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setCurrentQuestion(0);
    setTeamScore(0);
    setOpponentScore(0);
    setTimeLeft(15);
    setAnswered(false);
  };

  const answerQuestion = (selectedIndex: number) => {
    if (answered) return;
    
    setAnswered(true);
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setTeamScore(teamScore + 100);
    }
    
    const opponentCorrect = Math.random() > 0.4;
    if (opponentCorrect) {
      setOpponentScore(opponentScore + 100);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(15);
        setAnswered(false);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-3xl">Eco Warriors Battle</CardTitle>
                <p className="text-muted-foreground mt-2">Team environmental trivia challenge</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">How to Play:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Answer environmental trivia questions</li>
                <li>• Compete against another team</li>
                <li>• Each correct answer earns 100 points</li>
                <li>• 15 seconds per question</li>
                <li>• Team with most points wins!</li>
              </ul>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-semibold">Your Team: Green Warriors</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Opponent: Earth Defenders</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="font-semibold">Earn 250 eco points for winning</span>
            </div>
            <Button onClick={startGame} className="w-full" size="lg" data-testid="button-start-game">
              Start Battle
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
            <CardTitle className="text-2xl text-center">Battle Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className={`text-4xl font-bold ${won ? 'text-green-600' : tie ? 'text-yellow-600' : 'text-orange-600'}`}>
                {won ? '🏆 Victory!' : tie ? '🤝 Tie!' : '💪 Good Effort!'}
              </p>
              <p className="text-muted-foreground">
                {won ? 'Your team won the battle!' : tie ? 'Both teams are equally matched!' : 'Better luck next time!'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className={won ? "border-2 border-green-500" : ""}>
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{teamScore}</p>
                  <p className="text-sm text-muted-foreground">Green Warriors</p>
                  {won && <Badge className="mt-2 bg-green-600">Winner!</Badge>}
                </CardContent>
              </Card>
              <Card className={!won && !tie ? "border-2 border-red-500" : ""}>
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-2xl font-bold">{opponentScore}</p>
                  <p className="text-sm text-muted-foreground">Earth Defenders</p>
                  {!won && !tie && <Badge className="mt-2 bg-red-600">Winner!</Badge>}
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Performance Summary:</h3>
              <div className="space-y-1 text-sm">
                <p>• Questions Answered: {questions.length}</p>
                <p>• Correct Answers: {teamScore / 100}</p>
                <p>• Accuracy: {((teamScore / 100 / questions.length) * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={startGame} className="flex-1" data-testid="button-play-again">
                Battle Again
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

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Eco Warriors Battle</CardTitle>
              <Badge variant="outline" className="text-lg">
                <Clock className="h-4 w-4 mr-1" />
                {timeLeft}s
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 p-2 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Green Warriors</p>
                <p className="text-2xl font-bold text-primary">{teamScore}</p>
              </div>
              <div className="bg-muted p-2 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Earth Defenders</p>
                <p className="text-2xl font-bold">{opponentScore}</p>
              </div>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge className="mb-4">{question.category}</Badge>
            <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
            <div className="grid gap-3">
              {question.options.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() => answerQuestion(idx)}
                  variant={answered ? (idx === question.correct ? "default" : "outline") : "outline"}
                  className={`h-auto py-4 ${answered && idx === question.correct ? 'bg-green-600 hover:bg-green-700' : ''} ${answered && idx !== question.correct ? 'opacity-50' : ''}`}
                  disabled={answered}
                  data-testid={`option-${idx}`}
                >
                  <span className="text-lg">{option}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

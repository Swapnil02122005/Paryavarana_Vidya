import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Award, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [attempts, setAttempts] = useState(1);

  const questions = [
    {
      question: "What is the primary greenhouse gas responsible for global warming?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
      correct: 2
    },
    {
      question: "Which renewable energy source is most abundant in India?",
      options: ["Wind Energy", "Solar Energy", "Hydro Energy", "Geothermal Energy"],
      correct: 1
    },
    {
      question: "What does the '3Rs' in waste management stand for?",
      options: ["Reduce, Reuse, Recycle", "Remove, Restore, Reduce", "Reuse, Rebuild, Reform", "Reduce, Reform, Reclaim"],
      correct: 0
    },
    {
      question: "Which is the most effective way to save water at home?",
      options: ["Taking shorter showers", "Fixing leaky taps", "Rainwater harvesting", "All of the above"],
      correct: 3
    },
    {
      question: "What percentage of plastic waste in India is recycled?",
      options: ["10%", "30%", "50%", "70%"],
      correct: 1
    },
    {
      question: "Which tree species is best for urban air purification in India?",
      options: ["Neem", "Peepal", "Banyan", "All native species"],
      correct: 3
    },
    {
      question: "What is the main cause of deforestation in India?",
      options: ["Urban expansion", "Agricultural expansion", "Mining", "All of the above"],
      correct: 3
    },
    {
      question: "How much energy can be saved by switching to LED bulbs?",
      options: ["30%", "50%", "75%", "90%"],
      correct: 2
    },
    {
      question: "Which is NOT a biodegradable waste?",
      options: ["Food scraps", "Paper", "Plastic bottles", "Garden waste"],
      correct: 2
    },
    {
      question: "What is the ideal time to water plants to conserve water?",
      options: ["Morning or evening", "Afternoon", "Anytime", "Night only"],
      correct: 0
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, idx) => {
      if (parseInt(answer) === questions[idx].correct) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setAttempts(attempts + 1);
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 80;

    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                passed ? "bg-primary/10" : "bg-destructive/10"
              }`}>
                {passed ? (
                  <Award className="h-12 w-12 text-primary" />
                ) : (
                  <XCircle className="h-12 w-12 text-destructive" />
                )}
              </div>
              <h2 className="text-4xl font-bold mb-2">{score.toFixed(0)}%</h2>
              <p className="text-muted-foreground">
                You got {selectedAnswers.filter((ans, idx) => parseInt(ans) === questions[idx].correct).length} out of {questions.length} correct
              </p>
            </div>

            <div className={`p-6 rounded-md ${
              passed ? "bg-primary/10 border border-primary/20" : "bg-destructive/10 border border-destructive/20"
            }`}>
              <p className="font-semibold text-center mb-2">
                {passed ? "🎉 Congratulations! You Passed!" : "Keep Learning!"}
              </p>
              <p className="text-sm text-center">
                {passed 
                  ? "You've earned a certificate for completing this quiz with excellence!"
                  : `You need 80% to pass. This was attempt ${attempts}. Try again to improve your score!`
                }
              </p>
            </div>

            <div className="space-y-3">
              {passed ? (
                <Button className="w-full" data-testid="button-download-certificate">
                  <Award className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
              ) : (
                <Button className="w-full" onClick={handleRetry} data-testid="button-retry">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again (Attempt {attempts + 1})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display text-2xl font-bold">Environmental Knowledge Quiz</h1>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{questions[currentQuestion].question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup 
            value={selectedAnswers[currentQuestion] || ""} 
            onValueChange={handleAnswer}
          >
            {questions[currentQuestion].options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 rounded-md hover-elevate">
                <RadioGroupItem value={String(idx)} id={`q${currentQuestion}-option-${idx}`} />
                <Label 
                  htmlFor={`q${currentQuestion}-option-${idx}`}
                  className="flex-1 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button 
            className="w-full" 
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion]}
            data-testid="button-next-question"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Submit Quiz"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

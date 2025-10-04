import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, XCircle, RotateCcw, BookOpen, Target } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Quiz as QuizType } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Quiz() {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const hasSubmittedCompletionRef = useRef(false);
  const { toast } = useToast();

  const { data: quizzes = [], isLoading } = useQuery<QuizType[]>({
    queryKey: ["/api/quizzes"],
  });

  const completionMutation = useMutation({
    mutationFn: async ({ quizId, score, totalQuestions }: { quizId: string; score: number; totalQuestions: number }) => {
      const res = await apiRequest("POST", "/api/quizzes/complete", { quizId, score, totalQuestions });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes/completions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  if (!selectedQuiz) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2" data-testid="text-title">Environmental Quizzes</h1>
          <p className="text-muted-foreground text-lg">
            Test your knowledge on various environmental topics and earn eco-points!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="hover-elevate" data-testid={`card-quiz-${quiz.id}`}>
              <CardHeader>
                <CardTitle className="text-xl mb-2">{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    <Target className="h-3 w-3 mr-1" />
                    {quiz.category}
                  </Badge>
                  <Badge variant="outline">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {quiz.questions.length} Questions
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Earn up to</span>
                  <div className="font-semibold text-primary">
                    +{quiz.points} points
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => {
                    setSelectedQuiz(quiz);
                    setCurrentQuestion(0);
                    setSelectedAnswers([]);
                    setShowResults(false);
                    setAttempts(1);
                  }}
                  data-testid={`button-start-quiz-${quiz.id}`}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {quizzes.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No quizzes available yet. Check back soon!</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  const questions = selectedQuiz.questions;

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
      if (parseInt(answer) === questions[idx].correctAnswer) {
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
    hasSubmittedCompletionRef.current = false;
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setAttempts(1);
    hasSubmittedCompletionRef.current = false;
  };

  useEffect(() => {
    if (showResults && selectedQuiz && !hasSubmittedCompletionRef.current) {
      const correctCount = selectedAnswers.filter((ans, idx) => parseInt(ans) === questions[idx].correctAnswer).length;
      const score = (correctCount / questions.length) * 100;
      const passed = score >= 80;

      if (passed) {
        hasSubmittedCompletionRef.current = true;
        completionMutation.mutate({
          quizId: selectedQuiz.id,
          score: correctCount,
          totalQuestions: questions.length
        });
      }
    }
  }, [showResults, selectedQuiz?.id]);

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 80;
    const correctCount = selectedAnswers.filter((ans, idx) => parseInt(ans) === questions[idx].correctAnswer).length;

    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">{selectedQuiz?.title} - Results</CardTitle>
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
                You got {correctCount} out of {questions.length} correct
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
                  ? `Great job! You've earned ${selectedQuiz?.points} eco-points!`
                  : `You need 80% to pass. This was attempt ${attempts}. Try again to improve your score!`
                }
              </p>
            </div>

            <div className="space-y-3">
              {passed ? (
                <>
                  <Button className="w-full" onClick={handleBackToQuizzes} data-testid="button-back-to-quizzes">
                    Back to Quizzes
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full" onClick={handleRetry} data-testid="button-retry">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again (Attempt {attempts + 1})
                  </Button>
                  <Button className="w-full" variant="outline" onClick={handleBackToQuizzes} data-testid="button-back-to-quizzes">
                    Back to Quizzes
                  </Button>
                </>
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
          <h1 className="font-display text-2xl font-bold">{selectedQuiz?.title}</h1>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <Button variant="ghost" onClick={handleBackToQuizzes} className="mb-4" data-testid="button-back">
        ← Back to Quizzes
      </Button>

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

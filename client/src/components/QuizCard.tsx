import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizCardProps {
  question: string;
  options: string[];
  correctAnswer: number;
}

export function QuizCard({ question, options, correctAnswer }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
    console.log("Quiz submitted:", selectedAnswer);
  };

  const isCorrect = selectedAnswer === String(correctAnswer);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium">{question}</p>

        <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={String(index)} id={`option-${index}`} disabled={showResult} />
              <Label
                htmlFor={`option-${index}`}
                className={`flex-1 cursor-pointer ${
                  showResult && index === correctAnswer
                    ? "text-primary font-semibold"
                    : showResult && selectedAnswer === String(index)
                    ? "text-destructive"
                    : ""
                }`}
              >
                {option}
              </Label>
              {showResult && index === correctAnswer && (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              )}
              {showResult && selectedAnswer === String(index) && !isCorrect && (
                <XCircle className="h-5 w-5 text-destructive" />
              )}
            </div>
          ))}
        </RadioGroup>

        {showResult && (
          <div
            className={`p-4 rounded-md ${
              isCorrect ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
            }`}
          >
            <p className="font-semibold">
              {isCorrect ? "Correct! Great job!" : "Not quite. Try reviewing the lesson again."}
            </p>
          </div>
        )}

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!selectedAnswer || showResult}
          data-testid="button-submit-quiz"
        >
          {showResult ? "Completed" : "Submit Answer"}
        </Button>
      </CardContent>
    </Card>
  );
}

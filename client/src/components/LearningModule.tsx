import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle2, Circle } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
}

interface LearningModuleProps {
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
}

export function LearningModule({ title, description, progress, lessons }: LearningModuleProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="mb-2">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Module Progress</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-2">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center gap-3 p-3 rounded-md hover-elevate"
              data-testid={`lesson-${lesson.id}`}
            >
              {lesson.completed ? (
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
              <span className={`flex-1 text-sm ${lesson.completed ? "text-muted-foreground" : ""}`}>
                {lesson.title}
              </span>
            </div>
          ))}
        </div>

        <Button className="w-full" data-testid={`button-continue-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          Continue Learning
        </Button>
      </CardContent>
    </Card>
  );
}

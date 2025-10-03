import { useQuery, useMutation } from "@tanstack/react-query";
import type { User } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { UserPlus, Trash2, Award, Calendar } from "lucide-react";

export default function TeacherStudents() {
  const { toast } = useToast();
  const [studentUsername, setStudentUsername] = useState("");

  const { data: students = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/teacher/students"],
  });

  const addStudentMutation = useMutation({
    mutationFn: async (username: string) => {
      const res = await apiRequest("POST", "/api/teacher/students", { studentUsername: username });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/students"] });
      toast({
        title: "Success",
        description: "Student added successfully!",
      });
      setStudentUsername("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add student",
        variant: "destructive",
      });
    },
  });

  const removeStudentMutation = useMutation({
    mutationFn: async (studentId: string) => {
      const res = await apiRequest("DELETE", `/api/teacher/students/${studentId}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher/students"] });
      toast({
        title: "Success",
        description: "Student removed successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove student",
        variant: "destructive",
      });
    },
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentUsername.trim()) {
      addStudentMutation.mutate(studentUsername.trim());
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold">My Students</h1>
          <p className="text-muted-foreground">Manage and monitor your students' progress</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
            <CardDescription>Enter the student's username to add them to your class</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddStudent} className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="student-username" className="sr-only">Student Username</Label>
                <Input
                  id="student-username"
                  placeholder="Enter student username"
                  value={studentUsername}
                  onChange={(e) => setStudentUsername(e.target.value)}
                  data-testid="input-student-username"
                />
              </div>
              <Button
                type="submit"
                disabled={addStudentMutation.isPending || !studentUsername.trim()}
                data-testid="button-add-student"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {addStudentMutation.isPending ? "Adding..." : "Add Student"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {students.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No students added yet. Add students using their username above.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {students.map((student) => (
              <Card key={student.id} data-testid={`student-card-${student.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle data-testid={`student-name-${student.id}`}>{student.name}</CardTitle>
                      <CardDescription>@{student.username}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeStudentMutation.mutate(student.id)}
                      disabled={removeStudentMutation.isPending}
                      data-testid={`button-remove-${student.id}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{student.email || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mobile</p>
                      <p className="text-sm font-medium">{student.mobile || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">{student.location || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Institution</p>
                      <p className="text-sm font-medium">{student.institution || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Eco Points</p>
                        <p className="font-bold" data-testid={`student-points-${student.id}`}>
                          {student.ecoPoints || 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-chart-4" />
                      <div>
                        <p className="text-xs text-muted-foreground">Active Days</p>
                        <p className="font-bold" data-testid={`student-active-days-${student.id}`}>
                          {student.activeDays?.length || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {student.achievements && student.achievements.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-semibold mb-2">Achievements</p>
                      <div className="flex flex-wrap gap-2">
                        {student.achievements.slice(0, 3).map((achievement, idx) => (
                          <Badge key={idx} variant="secondary">
                            {achievement.icon} {achievement.title}
                          </Badge>
                        ))}
                        {student.achievements.length > 3 && (
                          <Badge variant="outline">+{student.achievements.length - 3} more</Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

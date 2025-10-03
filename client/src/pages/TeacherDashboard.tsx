import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Award, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function TeacherDashboard() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  const { data: students = [] } = useQuery<User[]>({
    queryKey: ["/api/teacher/students"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalEcoPoints = students.reduce((sum, student) => sum + (student.ecoPoints || 0), 0);
  const averageProgress = students.length > 0 ? Math.round(totalEcoPoints / students.length) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <Card data-testid="card-total-students">
            <CardHeader className="pb-3">
              <CardDescription>Total Students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold" data-testid="text-total-students">{students.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-total-points">
            <CardHeader className="pb-3">
              <CardDescription>Total Eco Points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Award className="h-8 w-8 text-chart-4" />
                <span className="text-3xl font-bold" data-testid="text-total-points">{totalEcoPoints}</span>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-average-progress">
            <CardHeader className="pb-3">
              <CardDescription>Average Progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-chart-5" />
                <span className="text-3xl font-bold" data-testid="text-average-progress">{averageProgress}</span>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-active-learners">
            <CardHeader className="pb-3">
              <CardDescription>Active Learners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold" data-testid="text-active-learners">{students.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your students and monitor progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/teacher/students">
                <Button className="w-full" data-testid="button-manage-students">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Students
                </Button>
              </Link>
              <Button variant="outline" className="w-full" data-testid="button-view-reports">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Progress Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        {students.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Students with the highest eco points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students
                  .sort((a, b) => (b.ecoPoints || 0) - (a.ecoPoints || 0))
                  .slice(0, 5)
                  .map((student, idx) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
                      data-testid={`student-${idx}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold" data-testid={`student-name-${idx}`}>{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.institution || "No institution"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary" data-testid={`student-points-${idx}`}>{student.ecoPoints || 0} pts</p>
                        <p className="text-sm text-muted-foreground">{student.activeDays?.length || 0} active days</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

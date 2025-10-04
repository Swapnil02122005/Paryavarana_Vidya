import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Leaf, Trophy, User, GraduationCap, LogOut, AlertCircle, Lightbulb, MessageSquare } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { User as UserType } from "@shared/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: user } = useQuery<UserType>({
    queryKey: ["/api/auth/me"],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/logout");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    },
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between gap-4">
        <Link href="/home">
          <a className="flex items-center gap-2 cursor-pointer">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold">Paryāvaraṇa Vidyā</span>
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard">
            <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Dashboard
            </a>
          </Link>
          <Link href="/quiz">
            <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Quizzes
            </a>
          </Link>
          <Link href="/challenges">
            <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Challenges
            </a>
          </Link>
          <Link href="/games">
            <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
              Games
            </a>
          </Link>
          <Link href="/issues">
            <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Issues
            </a>
          </Link>
          <Link href="/solutions">
            <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              Solutions
            </a>
          </Link>
          <Link href="/ai-chat">
            <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              AI Chat
            </a>
          </Link>
          {user?.role === "teacher" && (
            <Link href="/teacher/dashboard">
              <a className="text-sm font-medium hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                Teacher
              </a>
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user && (
            <div className="hidden sm:flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-md">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold" data-testid="text-eco-points">
                {user.ecoPoints || 0} pts
              </span>
            </div>
          )}
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" data-testid="button-profile">
                <User className="h-4 w-4 mr-1" />
                {user?.name || "Profile"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer" data-testid="menu-profile">
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
              </Link>
              {user?.role === "teacher" && (
                <>
                  <Link href="/teacher/dashboard">
                    <DropdownMenuItem className="cursor-pointer" data-testid="menu-teacher-dashboard">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Teacher Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/teacher/students">
                    <DropdownMenuItem className="cursor-pointer" data-testid="menu-teacher-students">
                      <User className="h-4 w-4 mr-2" />
                      My Students
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => logoutMutation.mutate()}
                data-testid="menu-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Launch from "@/pages/Launch";
import Dashboard from "@/pages/Dashboard";
import CurrentIssues from "@/pages/CurrentIssues";
import Solutions from "@/pages/Solutions";
import Quiz from "@/pages/Quiz";
import EcoClubs from "@/pages/EcoClubs";
import AIChat from "@/pages/AIChat";
import Games from "@/pages/Games";
import Redeem from "@/pages/Redeem";
import Profile from "@/pages/Profile";
import TeacherDashboard from "@/pages/TeacherDashboard";
import TeacherStudents from "@/pages/TeacherStudents";
import WasteSortingGame from "@/pages/WasteSortingGame";
import CarbonFootprintGame from "@/pages/CarbonFootprintGame";
import WaterConservationGame from "@/pages/WaterConservationGame";
import RenewableEnergyGame from "@/pages/RenewableEnergyGame";
import EcoWarriorsGame from "@/pages/EcoWarriorsGame";
import CleanupRaceGame from "@/pages/CleanupRaceGame";
import ClimateCrisisGame from "@/pages/ClimateCrisisGame";
import DisasterDashGame from "@/pages/DisasterDashGame";
import GreenHeroChallengeGame from "@/pages/GreenHeroChallengeGame";
import NotFound from "@/pages/not-found";
import { Header } from "@/components/Header";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/launch">
        {() => (
          <ProtectedRoute>
            <Launch />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/home">
        {() => (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/dashboard">
        {() => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/profile">
        {() => (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/teacher/dashboard">
        {() => (
          <ProtectedRoute requiredRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/teacher/students">
        {() => (
          <ProtectedRoute requiredRole="teacher">
            <TeacherStudents />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/current-issues">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <CurrentIssues />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/solutions">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <Solutions />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/quiz">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <Quiz />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/eco-clubs">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <EcoClubs />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/ai-chat">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <AIChat />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/games">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <Games />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/redeem">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <Redeem />
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/game/1">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <WasteSortingGame />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/game/2">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <CarbonFootprintGame />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/game/3">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <WaterConservationGame />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/game/4">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <RenewableEnergyGame />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/game/5">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <EcoWarriorsGame />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/game/6">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <CleanupRaceGame />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/game/7">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <ClimateCrisisGame />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/game/8">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <DisasterDashGame />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/game/9">
        {() => (
          <ProtectedRoute>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="max-w-7xl mx-auto px-4 py-8">
                <GreenHeroChallengeGame />
              </main>
            </div>
          </ProtectedRoute>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

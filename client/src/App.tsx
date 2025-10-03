import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import CurrentIssues from "@/pages/CurrentIssues";
import Solutions from "@/pages/Solutions";
import Quiz from "@/pages/Quiz";
import EcoClubs from "@/pages/EcoClubs";
import AIChat from "@/pages/AIChat";
import Games from "@/pages/Games";
import WasteSortingGame from "@/pages/WasteSortingGame";
import NotFound from "@/pages/not-found";
import { Header } from "@/components/Header";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/current-issues">
        {() => (
          <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
              <CurrentIssues />
            </main>
          </div>
        )}
      </Route>
      <Route path="/solutions">
        {() => (
          <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
              <Solutions />
            </main>
          </div>
        )}
      </Route>
      <Route path="/quiz">
        {() => (
          <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
              <Quiz />
            </main>
          </div>
        )}
      </Route>
      <Route path="/eco-clubs">
        {() => (
          <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
              <EcoClubs />
            </main>
          </div>
        )}
      </Route>
      <Route path="/ai-chat">
        {() => (
          <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
              <AIChat />
            </main>
          </div>
        )}
      </Route>
      <Route path="/games">
        {() => (
          <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
              <Games />
            </main>
          </div>
        )}
      </Route>
      <Route path="/game/1">
        {() => (
          <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
              <WasteSortingGame />
            </main>
          </div>
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

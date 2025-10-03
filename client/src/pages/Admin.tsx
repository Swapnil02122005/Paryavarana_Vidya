import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, Gamepad2, AlertTriangle, Lightbulb, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Header } from "@/components/Header";
import type { Game, Issue, Solution, EcoClub } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();

  const { data: games = [], isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: ["/api/games"],
  });

  const { data: issues = [], isLoading: issuesLoading } = useQuery<Issue[]>({
    queryKey: ["/api/issues"],
  });

  const { data: solutions = [], isLoading: solutionsLoading } = useQuery<Solution[]>({
    queryKey: ["/api/solutions"],
  });

  const { data: ecoClubs = [], isLoading: clubsLoading } = useQuery<EcoClub[]>({
    queryKey: ["/api/eco-clubs"],
  });

  const authenticateMutation = useMutation({
    mutationFn: async ({ table, id, authenticated }: { table: string; id: string; authenticated: boolean }) => {
      return await apiRequest("POST", "/api/admin/authenticate", { table, id, authenticated });
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Success",
        description: `Item ${variables.authenticated ? 'authenticated' : 'unauthenticated'} successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/games"] });
      queryClient.invalidateQueries({ queryKey: ["/api/issues"] });
      queryClient.invalidateQueries({ queryKey: ["/api/solutions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/eco-clubs"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update authentication status",
        variant: "destructive",
      });
    },
  });

  const handleAuthenticate = (table: string, id: string, authenticated: boolean) => {
    authenticateMutation.mutate({ table, id, authenticated });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground">Manage games, issues, solutions, and eco clubs</p>
        </div>

        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="games" data-testid="tab-games">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Games
            </TabsTrigger>
            <TabsTrigger value="issues" data-testid="tab-issues">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Issues
            </TabsTrigger>
            <TabsTrigger value="solutions" data-testid="tab-solutions">
              <Lightbulb className="h-4 w-4 mr-2" />
              Solutions
            </TabsTrigger>
            <TabsTrigger value="clubs" data-testid="tab-clubs">
              <Users className="h-4 w-4 mr-2" />
              Eco Clubs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-4">
            {gamesLoading ? (
              <p>Loading games...</p>
            ) : (
              <>
                {games.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">No games to review</p>
                    </CardContent>
                  </Card>
                ) : (
                  games.map((game) => (
                    <Card key={game.id} data-testid={`card-game-${game.id}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle data-testid={`text-game-title-${game.id}`}>{game.title}</CardTitle>
                            <CardDescription className="mt-2">{game.description}</CardDescription>
                          </div>
                          <Badge variant={game.authenticated ? "default" : "secondary"}>
                            {game.authenticated ? "Authenticated" : "Pending"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          {!game.authenticated && (
                            <Button
                              onClick={() => handleAuthenticate("games", game.id, true)}
                              disabled={authenticateMutation.isPending}
                              data-testid={`button-authenticate-${game.id}`}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Authenticate
                            </Button>
                          )}
                          {game.authenticated && (
                            <Button
                              variant="destructive"
                              onClick={() => handleAuthenticate("games", game.id, false)}
                              disabled={authenticateMutation.isPending}
                              data-testid={`button-revoke-${game.id}`}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Revoke
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            {issuesLoading ? (
              <p>Loading issues...</p>
            ) : (
              <>
                {issues.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">No issues to review</p>
                    </CardContent>
                  </Card>
                ) : (
                  issues.map((issue) => (
                    <Card key={issue.id} data-testid={`card-issue-${issue.id}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle data-testid={`text-issue-title-${issue.id}`}>{issue.title}</CardTitle>
                            <CardDescription className="mt-2">{issue.description}</CardDescription>
                          </div>
                          <Badge variant={issue.authenticated ? "default" : "secondary"}>
                            {issue.authenticated ? "Authenticated" : "Pending"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          {!issue.authenticated && (
                            <Button
                              onClick={() => handleAuthenticate("issues", issue.id, true)}
                              disabled={authenticateMutation.isPending}
                              data-testid={`button-authenticate-${issue.id}`}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Authenticate
                            </Button>
                          )}
                          {issue.authenticated && (
                            <Button
                              variant="destructive"
                              onClick={() => handleAuthenticate("issues", issue.id, false)}
                              disabled={authenticateMutation.isPending}
                              data-testid={`button-revoke-${issue.id}`}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Revoke
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="solutions" className="space-y-4">
            {solutionsLoading ? (
              <p>Loading solutions...</p>
            ) : (
              <>
                {solutions.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">No solutions to review</p>
                    </CardContent>
                  </Card>
                ) : (
                  solutions.map((solution) => (
                    <Card key={solution.id} data-testid={`card-solution-${solution.id}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle data-testid={`text-solution-title-${solution.id}`}>{solution.title}</CardTitle>
                            <CardDescription className="mt-2">{solution.description}</CardDescription>
                          </div>
                          <Badge variant={solution.authenticated ? "default" : "secondary"}>
                            {solution.authenticated ? "Authenticated" : "Pending"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          {!solution.authenticated && (
                            <Button
                              onClick={() => handleAuthenticate("solutions", solution.id, true)}
                              disabled={authenticateMutation.isPending}
                              data-testid={`button-authenticate-${solution.id}`}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Authenticate
                            </Button>
                          )}
                          {solution.authenticated && (
                            <Button
                              variant="destructive"
                              onClick={() => handleAuthenticate("solutions", solution.id, false)}
                              disabled={authenticateMutation.isPending}
                              data-testid={`button-revoke-${solution.id}`}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Revoke
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="clubs" className="space-y-4">
            {clubsLoading ? (
              <p>Loading eco clubs...</p>
            ) : (
              <>
                {ecoClubs.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">No eco clubs to review</p>
                    </CardContent>
                  </Card>
                ) : (
                  ecoClubs.map((club) => (
                    <Card key={club.id} data-testid={`card-club-${club.id}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle data-testid={`text-club-name-${club.id}`}>{club.name}</CardTitle>
                            <CardDescription className="mt-2">{club.description}</CardDescription>
                            <p className="text-sm text-muted-foreground mt-2">
                              Members: {club.memberCount || 0}
                            </p>
                          </div>
                          <Badge variant={club.authenticated ? "default" : "secondary"}>
                            {club.authenticated ? "Authenticated" : "Pending"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          {!club.authenticated && (
                            <Button
                              onClick={() => handleAuthenticate("eco_clubs", club.id, true)}
                              disabled={authenticateMutation.isPending}
                              data-testid={`button-authenticate-${club.id}`}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Authenticate
                            </Button>
                          )}
                          {club.authenticated && (
                            <Button
                              variant="destructive"
                              onClick={() => handleAuthenticate("eco_clubs", club.id, false)}
                              disabled={authenticateMutation.isPending}
                              data-testid={`button-revoke-${club.id}`}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Revoke
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

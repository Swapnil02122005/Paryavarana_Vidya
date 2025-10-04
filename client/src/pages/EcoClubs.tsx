import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, MessageCircle, Award, Settings, BookOpen, Edit, Trash2, UserPlus, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { EcoClub, User } from "@shared/schema";

export default function EcoClubs() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const { toast } = useToast();

  const { data: user } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  const { data: clubs = [], isLoading } = useQuery<EcoClub[]>({
    queryKey: ["/api/eco-clubs"],
  });

  const isTeacher = user?.role === "teacher";

  const handleCreateClub = () => {
    if (clubName && clubDescription) {
      toast({
        title: "Club Created!",
        description: `${clubName} has been successfully created.`,
      });
      setCreateDialogOpen(false);
      setClubName("");
      setClubDescription("");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading eco-clubs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="font-display text-3xl font-bold">Eco-Clubs</h1>
              <p className="text-muted-foreground">
                {isTeacher 
                  ? "Manage eco-clubs and environmental education" 
                  : "Connect with like-minded environmental champions"}
              </p>
            </div>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-club">
                <Plus className="h-4 w-4 mr-2" />
                Create Club
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Eco-Club</DialogTitle>
                <DialogDescription>
                  {isTeacher 
                    ? "Create a new eco-club for your students and institution" 
                    : "Create a new eco-club to collaborate with other students"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="club-name">Club Name</Label>
                  <Input
                    id="club-name"
                    placeholder="e.g., Green Warriors Club"
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    data-testid="input-club-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="club-description">Description</Label>
                  <Textarea
                    id="club-description"
                    placeholder="Describe the club's mission and activities..."
                    value={clubDescription}
                    onChange={(e) => setClubDescription(e.target.value)}
                    data-testid="textarea-club-description"
                  />
                </div>
                {isTeacher && (
                  <div className="space-y-2">
                    <Label htmlFor="club-institution">Institution</Label>
                    <Input
                      id="club-institution"
                      placeholder="School/College name"
                      data-testid="input-club-institution"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateClub} data-testid="button-submit-club">
                  Create Club
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {isTeacher && (
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-chart-4/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Teacher Dashboard
              </CardTitle>
              <CardDescription>
                As a teacher, you can create clubs, add educational content, and manage student participation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                <Button variant="outline" className="justify-start" data-testid="button-add-content">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
                <Button variant="outline" className="justify-start" data-testid="button-manage-students">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Manage Students
                </Button>
                <Button variant="outline" className="justify-start" data-testid="button-view-analytics">
                  <Award className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="bg-primary/10 border border-primary/20 rounded-md p-4 mb-6">
          <p className="text-sm">
            <span className="font-semibold">Note:</span> To create or join a club, you must have earned specific badges and certificates. Complete challenges to unlock more clubs!
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">All Eco-Clubs</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {clubs.map((club) => (
                <Card key={club.id} className="hover-elevate" data-testid={`club-${club.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{club.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{club.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{club.memberCount.toLocaleString()} members</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Target className="h-3 w-3 mr-1" />
                        {club.category}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" data-testid={`button-view-${club.id}`}>
                        <Users className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {isTeacher && (
                        <Button variant="outline" size="icon" data-testid={`button-manage-${club.id}`}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {clubs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No eco-clubs available yet. Check back soon!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

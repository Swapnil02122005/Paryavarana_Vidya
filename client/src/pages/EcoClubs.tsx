import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus, MessageCircle, Award } from "lucide-react";

export default function EcoClubs() {
  const myClubs = [
    {
      id: 1,
      name: "Tree Planters United",
      members: 45,
      badges: ["Tree Planter", "Green Leader"],
      description: "Focused on increasing green cover in urban areas",
      unreadMessages: 5
    },
    {
      id: 2,
      name: "Water Warriors",
      members: 32,
      badges: ["Water Saver"],
      description: "Working on water conservation projects",
      unreadMessages: 2
    }
  ];

  const availableClubs = [
    {
      id: 3,
      name: "Solar Champions",
      members: 28,
      requiredBadges: ["Solar Champion"],
      description: "Promoting renewable energy adoption",
      canJoin: false
    },
    {
      id: 4,
      name: "Waste Reduction Squad",
      members: 56,
      requiredBadges: ["Recycle Master"],
      description: "Zero waste initiatives and plastic reduction",
      canJoin: false
    },
    {
      id: 5,
      name: "Biodiversity Explorers",
      members: 23,
      requiredBadges: ["Eco Warrior"],
      description: "Documenting and protecting local ecosystems",
      canJoin: false
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="font-display text-3xl font-bold">Eco-Clubs</h1>
              <p className="text-muted-foreground">Connect with like-minded environmental champions</p>
            </div>
          </div>
          <Button data-testid="button-create-club">
            <Plus className="h-4 w-4 mr-2" />
            Create Club
          </Button>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-md p-4 mb-6">
          <p className="text-sm">
            <span className="font-semibold">Note:</span> To create or join a club, you must have earned specific badges and certificates. Complete challenges to unlock more clubs!
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">My Clubs</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {myClubs.map((club) => (
                <Card key={club.id} className="hover-elevate" data-testid={`my-club-${club.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{club.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{club.description}</p>
                      </div>
                      {club.unreadMessages > 0 && (
                        <Badge variant="destructive" className="rounded-full">
                          {club.unreadMessages}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{club.members} members</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {club.badges.map((badge, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
                          <Award className="h-3 w-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full" data-testid={`button-open-chat-${club.id}`}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Open Chat
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Discover Clubs</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {availableClubs.map((club) => (
                <Card key={club.id} className="hover-elevate opacity-75" data-testid={`club-${club.id}`}>
                  <CardHeader>
                    <CardTitle className="mb-2">{club.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{club.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{club.members} members</span>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Required badges:</p>
                      <div className="flex flex-wrap gap-2">
                        {club.requiredBadges.map((badge, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" variant="secondary" disabled data-testid={`button-join-${club.id}`}>
                      Earn Badge to Join
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

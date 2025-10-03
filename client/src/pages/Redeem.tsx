import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Coins, Trophy, ShoppingCart, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Redeem() {
  const { toast } = useToast();
  const [userPoints] = useState(2450);
  const userCoins = Math.floor(userPoints / 100);

  const rewards = [
    {
      id: 1,
      title: "Eco-Friendly Water Bottle",
      description: "Stainless steel water bottle with nature design",
      coins: 5,
      points: 500,
      image: "🍾",
      category: "Physical",
      stock: 15
    },
    {
      id: 2,
      title: "Plant a Real Tree",
      description: "We'll plant a real tree in your name",
      coins: 10,
      points: 1000,
      image: "🌳",
      category: "Impact",
      stock: 50
    },
    {
      id: 3,
      title: "Eco Badge Collection",
      description: "Unlock exclusive digital badges for your profile",
      coins: 3,
      points: 300,
      image: "🏆",
      category: "Digital",
      stock: 999
    },
    {
      id: 4,
      title: "Solar Power Bank",
      description: "Portable solar charger for your devices",
      coins: 15,
      points: 1500,
      image: "☀️",
      category: "Physical",
      stock: 8
    },
    {
      id: 5,
      title: "Seed Bomb Kit",
      description: "Kit with native wildflower seeds for guerrilla gardening",
      coins: 7,
      points: 700,
      image: "🌻",
      category: "Physical",
      stock: 20
    },
    {
      id: 6,
      title: "Certificate of Excellence",
      description: "Official environmental champion certificate",
      coins: 4,
      points: 400,
      image: "📜",
      category: "Digital",
      stock: 999
    },
    {
      id: 7,
      title: "Reusable Shopping Bags Set",
      description: "Set of 3 eco-friendly shopping bags",
      coins: 6,
      points: 600,
      image: "👜",
      category: "Physical",
      stock: 12
    },
    {
      id: 8,
      title: "Bamboo Cutlery Set",
      description: "Travel cutlery set made from bamboo",
      coins: 8,
      points: 800,
      image: "🥢",
      category: "Physical",
      stock: 10
    }
  ];

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (userCoins >= reward.coins) {
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.title} for ${reward.coins} coins.`,
      });
    } else {
      toast({
        title: "Insufficient Coins",
        description: `You need ${reward.coins - userCoins} more coins to redeem this reward.`,
        variant: "destructive",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Physical":
        return "bg-primary/10 text-primary";
      case "Impact":
        return "bg-chart-4/10 text-chart-4";
      case "Digital":
        return "bg-chart-5/10 text-chart-5";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center gap-3">
          <Gift className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-display text-3xl font-bold">Redeem Rewards</h1>
            <p className="text-muted-foreground">Exchange your coins for exciting eco-friendly rewards</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold mb-1">{userPoints.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Eco Points</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-chart-5/10 border-chart-5/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <Coins className="h-8 w-8 text-chart-5 mx-auto mb-2" />
                <p className="text-3xl font-bold mb-1">{userCoins}</p>
                <p className="text-sm text-muted-foreground">Available Coins</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-chart-4/10 border-chart-4/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <Gift className="h-8 w-8 text-chart-4 mx-auto mb-2" />
                <p className="text-3xl font-bold mb-1">8</p>
                <p className="text-sm text-muted-foreground">Rewards Claimed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold mb-1">Conversion Rate</p>
                <p className="text-sm text-muted-foreground">
                  100 Eco Points = 1 Coin. Keep earning points through challenges, games, and lessons to unlock more rewards!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className="hover-elevate" data-testid={`reward-${reward.id}`}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-5xl">{reward.image}</div>
                    <Badge className={getCategoryColor(reward.category)}>
                      {reward.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{reward.title}</CardTitle>
                  <CardDescription className="text-sm">{reward.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 font-semibold text-primary">
                      <Coins className="h-4 w-4" />
                      <span>{reward.coins} coins</span>
                    </div>
                    <div className="text-muted-foreground">
                      {reward.points} pts
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Stock: {reward.stock} available
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => handleRedeem(reward)}
                    disabled={userCoins < reward.coins}
                    data-testid={`button-redeem-${reward.id}`}
                  >
                    {userCoins >= reward.coins ? (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Redeem Now
                      </>
                    ) : (
                      <>Need {reward.coins - userCoins} more coins</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Redemption History</CardTitle>
            <CardDescription>Your recently claimed rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Eco Badge Collection", coins: 3, date: "2 days ago" },
                { name: "Certificate of Excellence", coins: 4, date: "5 days ago" },
                { name: "Plant a Real Tree", coins: 10, date: "1 week ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">-{item.coins} coins</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

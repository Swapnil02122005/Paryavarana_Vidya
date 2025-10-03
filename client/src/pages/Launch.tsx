import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, Trophy, Users, Gamepad2, BookOpen, Award, 
  Target, Zap, Gift, MessageSquare, TrendingUp, Shield 
} from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/stock_images/students_outdoor_env_a0678469.jpg";

export default function Launch() {
  const features = [
    {
      icon: Gamepad2,
      title: "Interactive Games",
      description: "Play exciting environmental games and earn points",
      color: "text-primary"
    },
    {
      icon: BookOpen,
      title: "Learn & Grow",
      description: "Explore lessons on climate, pollution, and sustainability",
      color: "text-chart-4"
    },
    {
      icon: Target,
      title: "Real Challenges",
      description: "Complete eco-friendly tasks and make real impact",
      color: "text-chart-5"
    },
    {
      icon: Gift,
      title: "Redeem Rewards",
      description: "Exchange points for eco-friendly gifts and plant trees",
      color: "text-destructive"
    },
    {
      icon: Users,
      title: "Eco-Clubs",
      description: "Join communities and collaborate on green projects",
      color: "text-blue-500"
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Get instant answers to environmental questions",
      color: "text-purple-500"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Students Learning", icon: Users },
    { number: "15M", label: "Points Earned", icon: Trophy },
    { number: "12,000+", label: "Trees Planted", icon: Leaf },
    { number: "500+", label: "Eco-Clubs", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Environmental Education"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Leaf className="h-16 w-16 text-primary" />
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white">
                Paryāvaraṇa Vidyā
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              Empowering Environmental Education Through Gamification
            </p>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Learn, play, and make a real difference! Join thousands of students transforming 
              environmental education into an exciting adventure.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/home">
                <Button size="lg" className="text-lg px-8 py-6" data-testid="button-get-started">
                  <Zap className="h-5 w-5 mr-2" />
                  Get Started
                </Button>
              </Link>
              <Link href="/games">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20" data-testid="button-explore-games">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Explore Games
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        <section>
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-base">Join the Movement</Badge>
            <h2 className="font-display text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-muted-foreground">Together, we're creating a greener future</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover-elevate text-center">
                  <CardContent className="pt-8 pb-6">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-4xl font-bold mb-2">{stat.number}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-base bg-primary/10 text-primary">Features</Badge>
            <h2 className="font-display text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete platform for environmental education with gamification, rewards, and real-world impact
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover-elevate">
                  <CardContent className="pt-6 space-y-4">
                    <div className={`h-14 w-14 rounded-full bg-muted/30 flex items-center justify-center ${feature.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary/10 via-chart-4/10 to-chart-5/10 rounded-2xl p-12">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Earn While You Learn
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Complete challenges, play games, and learn lessons to earn eco-points. 
              Convert your points to coins and redeem exciting eco-friendly rewards, 
              plant real trees, and make a tangible impact on the environment!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-background rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-primary">100 Points</p>
                <p className="text-sm text-muted-foreground">=  1 Coin</p>
              </div>
              <div className="bg-background rounded-lg px-6 py-4">
                <p className="text-3xl font-bold text-chart-4">1000 Points</p>
                <p className="text-sm text-muted-foreground">= Plant a Tree</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-base bg-chart-4/10 text-chart-4">Mission</Badge>
            <h2 className="font-display text-4xl font-bold mb-4">Why Paryāvaraṇa Vidyā?</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-primary/5 to-chart-4/5">
              <CardContent className="pt-8">
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-3">For Students</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Engage with fun, interactive environmental content</li>
                  <li>• Earn rewards and recognition for eco-friendly actions</li>
                  <li>• Compete with friends and climb leaderboards</li>
                  <li>• Track your environmental impact with detailed analytics</li>
                  <li>• Join eco-clubs and participate in group challenges</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-chart-5/5 to-primary/5">
              <CardContent className="pt-8">
                <Shield className="h-12 w-12 text-chart-5 mb-4" />
                <h3 className="text-2xl font-semibold mb-3">For Teachers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Create and manage eco-clubs for your students</li>
                  <li>• Add custom educational content and challenges</li>
                  <li>• Track student progress and engagement</li>
                  <li>• Foster environmental awareness in your institution</li>
                  <li>• Organize school-wide environmental competitions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the environmental education revolution today!
            </p>
            <Link href="/home">
              <Button size="lg" className="text-lg px-12 py-6" data-testid="button-start-journey">
                <Leaf className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="h-5 w-5 text-primary" />
            <p className="font-semibold">Paryāvaraṇa Vidyā</p>
          </div>
          <p className="text-sm">Empowering environmental education through gamification</p>
        </div>
      </footer>
    </div>
  );
}

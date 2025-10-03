import { Header } from "@/components/Header";
import { StatsOverview } from "@/components/StatsOverview";
import { ProgressCard } from "@/components/ProgressCard";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { ChallengeCard } from "@/components/ChallengeCard";
import { LearningModule } from "@/components/LearningModule";
import { Target, BookOpen, Zap, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import wasteSortingImage from "@assets/stock_images/waste_segregation_so_871ae14e.jpg";
import treePlantingImage from "@assets/stock_images/tree_planting_hands__ffbd7be4.jpg";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle>Your Location: Delhi, India</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Current environmental focus in your area: Air quality improvement and water conservation initiatives
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Link href="/current-issues">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <span className="text-lg">🌍</span>
                <span className="font-semibold">Current Issues</span>
              </Button>
            </Link>
            <Link href="/solutions">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <span className="text-lg">💡</span>
                <span className="font-semibold">Solutions</span>
              </Button>
            </Link>
            <Link href="/games">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <span className="text-lg">🎮</span>
                <span className="font-semibold">Play Games</span>
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <span className="text-lg">📝</span>
                <span className="font-semibold">Take Quiz</span>
              </Button>
            </Link>
            <Link href="/ai-chat">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                <span className="text-lg">🤖</span>
                <span className="font-semibold">AI Assistant</span>
              </Button>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold mb-4">Your Progress</h2>
          <StatsOverview />
        </section>

        <section>
          <div className="grid gap-6 md:grid-cols-3">
            <ProgressCard
              title="Challenges Completed"
              current={24}
              total={50}
              icon={<Target className="h-4 w-4" />}
            />
            <ProgressCard
              title="Lessons Learned"
              current={12}
              total={20}
              icon={<BookOpen className="h-4 w-4" />}
            />
            <ProgressCard
              title="Daily Streak"
              current={7}
              total={30}
              icon={<Zap className="h-4 w-4" />}
            />
          </div>
        </section>

        <section>
          <BadgeDisplay />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold mb-4">Featured Challenges</h2>
            <div className="space-y-4">
              <ChallengeCard
                title="Waste Segregation Challenge"
                description="Properly sort waste for one week"
                image={wasteSortingImage}
                difficulty="Easy"
                points={150}
                duration="7 days"
                category="Waste Management"
              />
              <ChallengeCard
                title="Plant a Tree"
                description="Participate in tree plantation drive"
                image={treePlantingImage}
                difficulty="Easy"
                points={200}
                duration="1 day"
                category="Conservation"
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold mb-4">Continue Learning</h2>
            <LearningModule
              title="Climate Change Basics"
              description="Understanding the science and impact"
              progress={60}
              lessons={[
                { id: "1", title: "What is Climate Change?", completed: true },
                { id: "2", title: "Greenhouse Effect Explained", completed: true },
                { id: "3", title: "Impact on Ecosystems", completed: true },
                { id: "4", title: "What Can We Do?", completed: false },
                { id: "5", title: "Global Efforts & Solutions", completed: false },
              ]}
            />
          </div>
        </section>

        <section>
          <LeaderboardCard />
        </section>
      </main>
    </div>
  );
}

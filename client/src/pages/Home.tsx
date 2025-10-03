import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { StatsOverview } from "@/components/StatsOverview";
import { ProgressCard } from "@/components/ProgressCard";
import { ChallengeCard } from "@/components/ChallengeCard";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { LearningModule } from "@/components/LearningModule";
import { QuizCard } from "@/components/QuizCard";
import { Target, BookOpen, Zap } from "lucide-react";
import wasteSortingImage from "@assets/stock_images/waste_segregation_so_871ae14e.jpg";
import treePlantingImage from "@assets/stock_images/tree_planting_hands__ffbd7be4.jpg";
import solarEnergyImage from "@assets/stock_images/solar_energy_panels__c1f1b8c7.jpg";
import waterConservationImage from "@assets/stock_images/water_conservation_c_fe482b3a.jpg";
import biodiversityImage from "@assets/stock_images/indian_forest_biodiv_e9bbd8eb.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <section id="dashboard">
          <h2 className="font-display text-3xl font-bold mb-6">Your Dashboard</h2>
          <StatsOverview />
        </section>

        <section>
          <h3 className="font-display text-2xl font-semibold mb-6">Current Progress</h3>
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

        <section id="challenges">
          <h2 className="font-display text-3xl font-bold mb-6">Featured Challenges</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ChallengeCard
              title="Waste Segregation Challenge"
              description="Properly sort waste into recyclable, organic, and general categories for one week"
              image={wasteSortingImage}
              difficulty="Easy"
              points={150}
              duration="7 days"
              category="Waste Management"
            />
            <ChallengeCard
              title="Plant a Tree"
              description="Participate in a tree plantation drive and document your contribution"
              image={treePlantingImage}
              difficulty="Easy"
              points={200}
              duration="1 day"
              category="Conservation"
            />
            <ChallengeCard
              title="Solar Energy Audit"
              description="Calculate potential solar energy savings for your school building"
              image={solarEnergyImage}
              difficulty="Medium"
              points={300}
              duration="3 days"
              category="Energy"
            />
            <ChallengeCard
              title="Water Conservation Project"
              description="Track and reduce water usage in your home for two weeks"
              image={waterConservationImage}
              difficulty="Medium"
              points={250}
              duration="14 days"
              category="Water"
            />
            <ChallengeCard
              title="Biodiversity Survey"
              description="Document local plant and animal species in your area"
              image={biodiversityImage}
              difficulty="Hard"
              points={400}
              duration="7 days"
              category="Biodiversity"
            />
          </div>
        </section>

        <section id="learn" className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold mb-6">Learning Modules</h2>
            <div className="space-y-6">
              <LearningModule
                title="Climate Change Basics"
                description="Understanding the science and impact of climate change on our planet"
                progress={60}
                lessons={[
                  { id: "1", title: "What is Climate Change?", completed: true },
                  { id: "2", title: "Greenhouse Effect Explained", completed: true },
                  { id: "3", title: "Impact on Ecosystems", completed: true },
                  { id: "4", title: "What Can We Do?", completed: false },
                  { id: "5", title: "Global Efforts & Solutions", completed: false },
                ]}
              />
              <LearningModule
                title="Waste Management"
                description="Learn about the 3Rs: Reduce, Reuse, Recycle"
                progress={80}
                lessons={[
                  { id: "1", title: "Types of Waste", completed: true },
                  { id: "2", title: "Segregation Methods", completed: true },
                  { id: "3", title: "Composting Basics", completed: true },
                  { id: "4", title: "Recycling Process", completed: true },
                  { id: "5", title: "Zero Waste Living", completed: false },
                ]}
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold mb-6">Test Your Knowledge</h2>
            <div className="space-y-6">
              <QuizCard
                question="Which greenhouse gas is most responsible for global warming?"
                options={[
                  "Oxygen",
                  "Nitrogen",
                  "Carbon Dioxide",
                  "Helium"
                ]}
                correctAnswer={2}
              />
              <QuizCard
                question="What does the '3Rs' stand for in waste management?"
                options={[
                  "Reduce, Reuse, Recycle",
                  "Remove, Restore, Reduce",
                  "Reuse, Rebuild, Reform",
                  "Reduce, Reform, Reclaim"
                ]}
                correctAnswer={0}
              />
            </div>
          </div>
        </section>

        <section id="leaderboard">
          <h2 className="font-display text-3xl font-bold mb-6">Leaderboard</h2>
          <LeaderboardCard />
        </section>
      </main>

      <footer className="border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Paryāvaraṇa Vidyā. Empowering students for a sustainable future.
          </p>
        </div>
      </footer>
    </div>
  );
}

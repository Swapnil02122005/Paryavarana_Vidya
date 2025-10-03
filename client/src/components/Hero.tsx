import { Button } from "@/components/ui/button";
import { Leaf, Users, Trophy } from "lucide-react";
import heroImage from "@assets/stock_images/students_outdoor_env_a0678469.jpg";

export function Hero() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
          Paryāvaraṇa Vidyā
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Transform environmental learning through gamification. Earn eco-points, complete real-world challenges, and become an environmental champion.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button size="lg" variant="default" data-testid="button-get-started">
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-md p-6 border border-white/20">
            <Users className="h-8 w-8 text-white mb-3 mx-auto" />
            <div className="text-3xl font-bold text-white mb-1">10,000+</div>
            <div className="text-white/80 text-sm">Active Students</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-md p-6 border border-white/20">
            <Leaf className="h-8 w-8 text-white mb-3 mx-auto" />
            <div className="text-3xl font-bold text-white mb-1">50,000+</div>
            <div className="text-white/80 text-sm">Trees Planted</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-md p-6 border border-white/20">
            <Trophy className="h-8 w-8 text-white mb-3 mx-auto" />
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-white/80 text-sm">Schools Participating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

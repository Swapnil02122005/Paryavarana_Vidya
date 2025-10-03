import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Lightbulb, Play } from "lucide-react";
import { useState } from "react";
import treePlantingImage from "@assets/stock_images/tree_planting_hands__ffbd7be4.jpg";
import solarEnergyImage from "@assets/stock_images/solar_energy_panels__c1f1b8c7.jpg";
import waterConservationImage from "@assets/stock_images/water_conservation_c_fe482b3a.jpg";
import wasteSortingImage from "@assets/stock_images/waste_segregation_so_871ae14e.jpg";
import biodiversityImage from "@assets/stock_images/indian_forest_biodiv_e9bbd8eb.jpg";

interface Solution {
  id: number;
  title: string;
  category: string;
  image: string;
  difficulty: string;
  methods: string[];
  impact: string;
  videoAvailable: boolean;
  videoId?: string;
}

export default function Solutions() {
  const [selectedVideo, setSelectedVideo] = useState<Solution | null>(null);

  const solutions: Solution[] = [
    {
      id: 1,
      title: "Plant More Trees & Create Green Spaces",
      category: "Air Quality",
      image: treePlantingImage,
      difficulty: "Easy",
      methods: [
        "Participate in tree plantation drives",
        "Create rooftop gardens and vertical gardens",
        "Support urban forestry initiatives",
        "Use native plant species for better adaptation"
      ],
      impact: "Trees absorb CO2, produce oxygen, and filter air pollutants",
      videoAvailable: true,
      videoId: "yHYQR1AEwCg"
    },
    {
      id: 2,
      title: "Switch to Renewable Energy",
      category: "Energy",
      image: solarEnergyImage,
      difficulty: "Medium",
      methods: [
        "Install solar panels at home or school",
        "Use solar water heaters",
        "Support community solar projects",
        "Reduce energy consumption through efficiency"
      ],
      impact: "Reduces carbon emissions and dependency on fossil fuels",
      videoAvailable: true,
      videoId: "8Z-AP7w1Q0Q"
    },
    {
      id: 3,
      title: "Water Conservation Methods",
      category: "Water",
      image: waterConservationImage,
      difficulty: "Easy",
      methods: [
        "Harvest rainwater at home and school",
        "Fix leaking taps and pipes promptly",
        "Use drip irrigation for gardens",
        "Reuse water for multiple purposes"
      ],
      impact: "Saves precious water resources and reduces water bills",
      videoAvailable: true,
      videoId: "JVBg1dS0aaQ"
    },
    {
      id: 4,
      title: "Reduce, Reuse, Recycle - Waste Management",
      category: "Waste",
      image: wasteSortingImage,
      difficulty: "Easy",
      methods: [
        "Segregate waste at source into wet, dry, and hazardous",
        "Compost organic waste at home",
        "Use reusable bags, bottles, and containers",
        "Donate or sell items instead of throwing them away"
      ],
      impact: "Reduces landfill waste by 70% and conserves natural resources",
      videoAvailable: true,
      videoId: "6jQ7y_qQYUA"
    },
    {
      id: 5,
      title: "Sustainable Transportation",
      category: "Air Quality",
      image: solarEnergyImage,
      difficulty: "Easy",
      methods: [
        "Use public transport, carpool, or bike to work/school",
        "Walk for short distances instead of using vehicles",
        "Support electric vehicle adoption",
        "Maintain vehicles properly to reduce emissions"
      ],
      impact: "Cuts carbon emissions by 40% and improves urban air quality",
      videoAvailable: false
    },
    {
      id: 6,
      title: "Organic & Sustainable Farming",
      category: "Agriculture",
      image: biodiversityImage,
      difficulty: "Medium",
      methods: [
        "Use organic fertilizers and natural pest control",
        "Practice crop rotation and intercropping",
        "Adopt water-efficient irrigation techniques",
        "Support local organic farmers and markets"
      ],
      impact: "Improves soil health, reduces chemical pollution, and produces healthier food",
      videoAvailable: true,
      videoId: "NaZP6AYD7I8"
    },
    {
      id: 7,
      title: "Protect & Restore Ecosystems",
      category: "Biodiversity",
      image: biodiversityImage,
      difficulty: "Hard",
      methods: [
        "Participate in wetland and forest restoration projects",
        "Create wildlife corridors and green belts",
        "Support conservation organizations",
        "Avoid products made from endangered species"
      ],
      impact: "Preserves biodiversity and maintains ecological balance",
      videoAvailable: true,
      videoId: "rStL0OY617M"
    },
    {
      id: 8,
      title: "Reduce Plastic Usage",
      category: "Waste",
      image: wasteSortingImage,
      difficulty: "Easy",
      methods: [
        "Carry reusable shopping bags and bottles",
        "Say no to single-use plastics like straws and cutlery",
        "Choose products with minimal or biodegradable packaging",
        "Participate in beach and river cleanup drives"
      ],
      impact: "Reduces ocean plastic pollution and protects marine life",
      videoAvailable: false
    },
    {
      id: 9,
      title: "Green Building & Energy Efficiency",
      category: "Energy",
      image: solarEnergyImage,
      difficulty: "Hard",
      methods: [
        "Use LED bulbs and energy-efficient appliances",
        "Improve insulation to reduce heating/cooling needs",
        "Install rainwater harvesting and greywater systems",
        "Design buildings with natural light and ventilation"
      ],
      impact: "Reduces energy consumption by 50% and lowers carbon footprint",
      videoAvailable: true,
      videoId: "wR0l3PE3L0k"
    },
    {
      id: 10,
      title: "Community Awareness & Education",
      category: "Education",
      image: treePlantingImage,
      difficulty: "Easy",
      methods: [
        "Organize environmental awareness campaigns",
        "Conduct workshops on sustainable living",
        "Share information through social media",
        "Involve children in eco-friendly activities"
      ],
      impact: "Creates a culture of environmental responsibility and collective action",
      videoAvailable: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-chart-4/20 text-chart-4";
      case "Medium":
        return "bg-chart-5/20 text-chart-5";
      default:
        return "bg-destructive/20 text-destructive";
    }
  };

  const handleVideoClick = (solution: Solution) => {
    if (solution.videoAvailable) {
      setSelectedVideo(solution);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-display text-3xl font-bold">Environmental Solutions</h1>
            <p className="text-muted-foreground">Practical methods to overcome environmental challenges</p>
          </div>
        </div>

        <div className="space-y-6">
          {solutions.map((solution) => (
            <Card key={solution.id} className="overflow-hidden" data-testid={`solution-${solution.id}`}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-auto">
                  <img src={solution.image} alt={solution.title} className="w-full h-full object-cover" />
                  {solution.videoAvailable && (
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group"
                      onClick={() => handleVideoClick(solution)}
                      data-testid={`video-play-${solution.id}`}
                    >
                      <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 md:py-6 md:pr-6 md:pl-0">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <CardTitle className="text-2xl">{solution.title}</CardTitle>
                      <Badge className={getDifficultyColor(solution.difficulty)}>
                        {solution.difficulty}
                      </Badge>
                    </div>
                    <Badge variant="secondary">{solution.category}</Badge>
                  </CardHeader>

                  <CardContent className="p-0 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How to Implement:</h4>
                      <ul className="space-y-1.5">
                        {solution.methods.map((method, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>{method}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-md border border-primary/20">
                      <p className="text-sm font-medium">
                        <span className="font-semibold text-primary">Expected Impact:</span> {solution.impact}
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => handleVideoClick(solution)}
                      disabled={!solution.videoAvailable}
                      data-testid={`button-learn-${solution.id}`}
                    >
                      {solution.videoAvailable ? "Watch Tutorial Video" : "Learn More"}
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription>Learn how to implement this solution</DialogDescription>
          </DialogHeader>
          {selectedVideo && selectedVideo.videoId && (
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

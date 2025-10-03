import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Play } from "lucide-react";
import treePlantingImage from "@assets/stock_images/tree_planting_hands__ffbd7be4.jpg";
import solarEnergyImage from "@assets/stock_images/solar_energy_panels__c1f1b8c7.jpg";
import waterConservationImage from "@assets/stock_images/water_conservation_c_fe482b3a.jpg";

export default function Solutions() {
  const solutions = [
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
      videoAvailable: true
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
      videoAvailable: true
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
      videoAvailable: true
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

  return (
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
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group">
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

                  <Button className="w-full" data-testid={`button-learn-${solution.id}`}>
                    {solution.videoAvailable ? "Watch Tutorial Video" : "Learn More"}
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

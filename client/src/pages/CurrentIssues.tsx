import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import airPollutionImage from "@assets/stock_images/air_pollution_india__73c3d2a4.jpg";
import waterScarcityImage from "@assets/stock_images/water_scarcity_india_8060ddf5.jpg";
import plasticWasteImage from "@assets/stock_images/plastic_waste_pollut_ad474bbe.jpg";
import biodiversityImage from "@assets/stock_images/indian_forest_biodiv_e9bbd8eb.jpg";
import treePlantingImage from "@assets/stock_images/tree_planting_hands__ffbd7be4.jpg";

export default function CurrentIssues() {
  const issues = [
    {
      id: 1,
      title: "Air Pollution Crisis",
      location: "Delhi NCR & Major Cities",
      severity: "Critical",
      image: airPollutionImage,
      reasons: [
        "Vehicle emissions and traffic congestion",
        "Industrial pollution and coal-based power plants",
        "Crop burning in neighboring states",
        "Construction dust and lack of green cover"
      ],
      impact: "Affects 140 million people, causes respiratory diseases, reduces life expectancy by 9 years"
    },
    {
      id: 2,
      title: "Water Scarcity",
      location: "Across India",
      severity: "High",
      image: waterScarcityImage,
      reasons: [
        "Overexploitation of groundwater",
        "Climate change affecting monsoon patterns",
        "Poor water management and storage",
        "Pollution of water bodies"
      ],
      impact: "600 million people face water stress, affects agriculture and daily life"
    },
    {
      id: 3,
      title: "Plastic Pollution",
      location: "Coastal Areas & Rivers",
      severity: "High",
      image: plasticWasteImage,
      reasons: [
        "Single-use plastic consumption",
        "Inadequate waste management systems",
        "Lack of recycling infrastructure",
        "Improper disposal practices"
      ],
      impact: "9 million tons of plastic waste annually, harms marine life and ecosystems"
    },
    {
      id: 4,
      title: "Deforestation & Forest Degradation",
      location: "Western Ghats, Northeastern States",
      severity: "High",
      image: biodiversityImage,
      reasons: [
        "Agricultural expansion and urbanization",
        "Illegal logging and timber trade",
        "Mining and industrial projects",
        "Forest fires and climate change"
      ],
      impact: "Loss of 1.97 million hectares of forest cover, threatens wildlife habitats and indigenous communities"
    },
    {
      id: 5,
      title: "Soil Degradation & Desertification",
      location: "Rajasthan, Gujarat, and Drylands",
      severity: "High",
      image: waterScarcityImage,
      reasons: [
        "Overgrazing and intensive farming",
        "Excessive use of chemical fertilizers",
        "Poor irrigation practices leading to salinization",
        "Climate change and irregular rainfall"
      ],
      impact: "30% of India's land is degraded, affects food security and farmer livelihoods"
    },
    {
      id: 6,
      title: "Biodiversity Loss",
      location: "National Parks and Wildlife Sanctuaries",
      severity: "Critical",
      image: biodiversityImage,
      reasons: [
        "Habitat destruction and fragmentation",
        "Human-wildlife conflict",
        "Poaching and illegal wildlife trade",
        "Climate change affecting ecosystems"
      ],
      impact: "Endangered species declining rapidly, disrupts ecological balance and ecosystem services"
    },
    {
      id: 7,
      title: "Urban Heat Islands",
      location: "Metro Cities",
      severity: "Medium",
      image: airPollutionImage,
      reasons: [
        "Excessive concrete and asphalt surfaces",
        "Loss of green cover and water bodies",
        "Heat emissions from vehicles and AC units",
        "High-density urban development"
      ],
      impact: "Cities 5-7°C hotter than surrounding areas, increases energy consumption and health risks"
    },
    {
      id: 8,
      title: "E-Waste Accumulation",
      location: "Urban Areas",
      severity: "Medium",
      image: plasticWasteImage,
      reasons: [
        "Rapid growth in electronic device usage",
        "Lack of proper recycling facilities",
        "Informal recycling causing toxic exposure",
        "Short product lifecycles and planned obsolescence"
      ],
      impact: "3.2 million tons of e-waste annually, releases heavy metals and toxins into environment"
    },
    {
      id: 9,
      title: "Noise Pollution",
      location: "Cities and Industrial Areas",
      severity: "Medium",
      image: airPollutionImage,
      reasons: [
        "Traffic congestion and vehicle horns",
        "Construction and industrial activities",
        "Loudspeakers and public events",
        "Lack of noise regulation enforcement"
      ],
      impact: "Causes stress, hearing loss, sleep disturbances, and affects mental health of millions"
    },
    {
      id: 10,
      title: "Groundwater Contamination",
      location: "Agricultural and Industrial Belts",
      severity: "High",
      image: waterScarcityImage,
      reasons: [
        "Industrial effluent discharge",
        "Agricultural pesticide and fertilizer runoff",
        "Improper sewage disposal",
        "Mining activities and landfill leachate"
      ],
      impact: "Affects drinking water quality for millions, causes health problems including cancer and neurological disorders"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-destructive/20 text-destructive";
      case "High":
        return "bg-chart-5/20 text-chart-5";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-8 w-8 text-chart-5" />
        <div>
          <h1 className="font-display text-3xl font-bold">Current Environmental Issues in India</h1>
          <p className="text-muted-foreground">Understanding the challenges we face today</p>
        </div>
      </div>

      <div className="space-y-6">
        {issues.map((issue) => (
          <Card key={issue.id} className="overflow-hidden" data-testid={`issue-${issue.id}`}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-auto">
                <img src={issue.image} alt={issue.title} className="w-full h-full object-cover" />
                <Badge className={`absolute top-4 right-4 ${getSeverityColor(issue.severity)}`}>
                  {issue.severity}
                </Badge>
              </div>

              <div className="p-6 md:py-6 md:pr-6 md:pl-0">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl mb-2">{issue.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{issue.location}</p>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Main Causes:</h4>
                    <ul className="space-y-1.5">
                      {issue.reasons.map((reason, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-destructive/10 rounded-md border border-destructive/20">
                    <p className="text-sm font-medium text-destructive-foreground">
                      <span className="font-semibold">Impact:</span> {issue.impact}
                    </p>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

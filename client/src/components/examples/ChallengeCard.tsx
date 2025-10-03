import { ChallengeCard } from "../ChallengeCard";
import wasteSortingImage from "@assets/stock_images/waste_segregation_so_871ae14e.jpg";

export default function ChallengeCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <ChallengeCard
        title="Waste Segregation Challenge"
        description="Properly sort waste into recyclable, organic, and general categories for one week"
        image={wasteSortingImage}
        difficulty="Easy"
        points={150}
        duration="7 days"
        category="Waste Management"
      />
    </div>
  );
}

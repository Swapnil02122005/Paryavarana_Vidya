import { ProgressCard } from "../ProgressCard";
import { Target } from "lucide-react";

export default function ProgressCardExample() {
  return (
    <div className="p-4">
      <ProgressCard
        title="Challenges Completed"
        current={24}
        total={50}
        icon={<Target className="h-4 w-4" />}
      />
    </div>
  );
}

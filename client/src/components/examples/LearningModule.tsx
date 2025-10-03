import { LearningModule } from "../LearningModule";

export default function LearningModuleExample() {
  return (
    <div className="p-4 max-w-md">
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
    </div>
  );
}

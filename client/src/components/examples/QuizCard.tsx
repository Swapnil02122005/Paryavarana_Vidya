import { QuizCard } from "../QuizCard";

export default function QuizCardExample() {
  return (
    <div className="p-4 max-w-md">
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
    </div>
  );
}

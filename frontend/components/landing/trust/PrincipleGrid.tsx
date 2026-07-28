import PrincipleCard from "./PrincipleCard";

const principles = [
  {
    title: "Approval",
    description: "Nothing is sent without you.",
  },
  {
    title: "Transparent",
    description: "See what changed before it happens.",
  },
  {
    title: "Reversible",
    description: "Edit, regenerate, or cancel anytime.",
  },
];

export default function PrincipleGrid() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
      {principles.map((principle) => (
        <PrincipleCard
          key={principle.title}
          title={principle.title}
          description={principle.description}
        />
      ))}
    </div>
  );
}
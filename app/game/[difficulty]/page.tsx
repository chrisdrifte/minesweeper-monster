import GameClient from "./GameClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [
    {
      difficulty: "easy",
    },
    {
      difficulty: "hard",
    },
    {
      difficulty: "expert",
    },
  ];
}

export type GamePageProps = {
  params: { difficulty: string };
};

export default async function GamePage({ params }: GamePageProps) {
  const { difficulty } = params;

  switch (difficulty) {
    default:
      notFound();

    case "easy":
    case "hard":
    case "expert":
      break;
  }

  return <GameClient difficulty={difficulty} />;
}

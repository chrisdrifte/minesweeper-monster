import { GamePlay } from "@/components/game/GamePlay";
import { difficulties } from "@/config/difficulties";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return Object.keys(difficulties).map((difficulty) => {
    difficulty;
  });
}

export type GamePageProps = {
  params: { difficulty: keyof typeof difficulties };
};

export default async function GamePage({ params }: GamePageProps) {
  const { difficulty } = params;

  if (!difficulties[difficulty]) {
    notFound();
  }

  return (
    <GamePlay
      settings={difficulties[difficulty]}
      tipText="Tip: You can also right click to place flags"
    />
  );
}

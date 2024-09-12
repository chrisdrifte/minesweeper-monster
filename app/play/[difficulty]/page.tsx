import GamePlayWithRestart from "@/components/game/GamePlayWithRestart";
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

  return <GamePlayWithRestart settings={difficulties[difficulty]} />;
}

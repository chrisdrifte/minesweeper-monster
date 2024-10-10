import { DailyPuzzle } from "../../../components/game/daily/DailyPuzzle";
import { GamePlayFromSettings } from "@/components/game/GamePlayFromSettings";
import { difficulties } from "@/config/difficulties";
import { getDailySolution } from "@/components/game/daily/getDailySolution";
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

  switch (difficulty) {
    default:
      return (
        <GamePlayFromSettings
          gameModeKey={difficulty}
          settings={difficulties[difficulty]}
          tipText="Tip: You can also right click to place flags"
          showRestart
        />
      );

    case "daily":
      return <DailyPuzzle initialDailySolution={getDailySolution()} />;
  }
}

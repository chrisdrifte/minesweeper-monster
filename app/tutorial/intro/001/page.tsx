import { GameReplay } from "@/components/game/GameReplay";
import Link from "next/link";

export default function TutorialIntro001() {
  return (
    <div>
      Minesweeper consists of a grid of cells, like the one below. Some cells
      contain mines. You lose the game by clicking a cell with a mine.
      <GameReplay
        levelData={`
          XXX
          XMX
          XXX
        `}
        steps={[{ type: "dig", target: { x: 1, y: 1 } }]}
      />
      <Link href="/tutorial/intro/002">Next lesson</Link>
    </div>
  );
}

import { GameStatic } from "@/components/game/GameStatic";
import { GameTour } from "@/components/game/GameTour";
import Link from "next/link";

export default function TutorialIntro002() {
  return (
    <div>
      Clicking a cell next to a mine will reveal a number.
      <GameTour
        levelData={`
          XXX
          XMX
          XXX
        `}
        steps={[{ type: "dig", target: { x: 0, y: 0 } }]}
      />
      The number corresponds to the number of mines that the cell is touching.
      <GameStatic
        levelData={`
          1221
          1MM1
          1221
        `}
      />
      <Link href="/tutorial/intro/003">Next lesson</Link>
    </div>
  );
}

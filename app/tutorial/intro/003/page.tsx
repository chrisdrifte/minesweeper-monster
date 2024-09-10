import { GameTour } from "@/components/game/GameTour";
import Link from "next/link";

export default function TutorialIntro003() {
  return (
    <div>
      If you suspect that a cell contains a mine, you can "flag" it.
      <GameTour
        levelData={`
        1221
        1MM1
        1221
      `}
        steps={[
          { type: "select-flag" },
          { type: "flag", target: { x: 1, y: 1 } },
          { type: "flag", target: { x: 2, y: 1 } },
        ]}
      />
      <Link href="/tutorial/intro/004">Next lesson</Link>
    </div>
  );
}

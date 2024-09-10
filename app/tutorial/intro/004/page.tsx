import { GameTour } from "@/components/GameTour";
import Link from "next/link";

export default function TutorialIntro004() {
  return (
    <div>
      Clicking an empty cell reveals all the cells around it!
      <GameTour
        levelData={`
        XXXXX
        XXXXX
        XXMMX
        XXMXX
        XXXXX
      `}
        steps={[{ type: "dig", target: { x: 0, y: 0 } }]}
      />
      <Link href="/tutorial/intro/005">Next lesson</Link>
    </div>
  );
}

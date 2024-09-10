import { GamePlay } from "@/components/GamePlay";
import Link from "next/link";

export default function TutorialIntro006() {
  return (
    <div>
      Complete this game to practice your new skills.
      <GamePlay
        levelData={`
        111XXX
        1M2XXX
        112MXX
        XXXXXX        
      `}
      />
      <Link href="/">Back to home</Link>
    </div>
  );
}

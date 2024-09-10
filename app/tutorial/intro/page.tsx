import { GamePlay } from "@/components/GamePlay";
import { GameReplay } from "@/components/GameReplay";
import { GameStatic } from "@/components/GameStatic";
import { GameTour } from "@/components/GameTour";

export default function TutorialIntro() {
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
      Clicking an empty cell reveals all the cells around it!
      <GameTour
        levelData={`
        XXXXX
        XXXXX
        XXMXX
        XXXXX
        XXXXX
      `}
        steps={[{ type: "dig", target: { x: 0, y: 0 } }]}
      />
      Complete this game to practice your new skills.
      <GamePlay
        levelData={`
        111XXX
        1M2XXX
        112MXX
        XXXXXX        
      `}
      />
    </div>
  );
}

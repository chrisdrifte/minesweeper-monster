import { BoardData } from "@/types/BoardData";
import { CellId } from "@/types/CellId";
import { ChangedCell } from "@/types/ChangedCell";
import { ReplayDataMode } from "@/types/enums/ReplayDataMode";
import { Target } from "@/types/Target";
import { createCellId } from "@/helpers/createCellId";
import { decodeNumber } from "./decodeNumber";

const MIN_TIME = -1; // -1 represents the time before the game has begun

export function decodeReplayData(replayData: string) {
  /**
   * Replay data consists of several parts, split by a semi-colon
   *
   * 1. Version, to allow for future changes to the encoding logic
   * 2. UTC String, representing the date the game was started
   * 3. Game mode, represent the game mode the game was played in
   * 4. Game data, representing all the states of the game
   *
   * The game data is designed to be readable as a stream to support possible
   * future features such as multiplayer or watching other players live.
   */
  const replayDataParts = replayData.split(";");
  const version = replayDataParts[0];
  const data = replayDataParts[3];

  if (version !== "V1") {
    throw new Error("Unsupported version");
  }

  // the stream is appended to this variable until it represents a full unit of
  // data, at which point it is processed by processDataUnit
  let dataUnit = "";

  // stores the current mode of the data unit, eg. ! if the data represents the
  // board width, height, and number of mines
  let mode = "";

  // as data units are processed, the following variables will be set
  // when enough data is present, these variables are combined into a single
  // frame
  let boardData: BoardData | undefined;

  let target: Target | undefined;

  let time = 0;

  let changedCells: ChangedCell[] = [];

  // contains the previously generated level data to which cell diffs will be
  // applied
  let prevLevelData: string | undefined;

  // level data and the cell ids that the user interacts with are referenced
  // separately, as interactions do not guarantee a change in level data, and
  // a change in level data does not guarantee an interaction.
  // eg. the user clicks, but no new cells were revealed
  // eg. the game reveals the mines at the end of the game in a separate frame
  const levelDataByTime: Record<number, string> = {};
  const targetsByTime: Record<number, CellId> = {};

  /**
   * Decode a unit of streamed data
   */
  const processDataUnit = (dataUnit: string, mode: string) => {
    switch (mode) {
      /**
       * The board size and number of mines is represented by 4 or more
       * characters, eg. !0123
       *
       * ! = enable board size mode
       * 0 = width
       * 1 = height
       * 23 = number of mines
       */
      case ReplayDataMode.Board: {
        const [width, height, ...numMines] = dataUnit;

        boardData = {
          width: decodeNumber(width),
          height: decodeNumber(height),
          numMines: decodeNumber(numMines),
        };

        break;
      }

      /**
       * The target cell (the cell that was interacted with by the user) is
       * represented by 3 characters, eg. @01
       *
       * @ = enable interaction mode
       * 0 = x position
       * 1 = y position
       */
      case ReplayDataMode.Interaction: {
        const [x, y] = dataUnit;
        target = { x: decodeNumber(x), y: decodeNumber(y) };
        break;
      }

      /**
       * The time of the state change is represented by any number of
       * characters, eg. #01234
       *
       * # = enable time mode
       * 01234 = the number of milliseconds since the start of the game
       */
      case ReplayDataMode.Time: {
        time = decodeNumber(dataUnit);
        break;
      }

      /**
       * The diff between game states is represented by 3 characters, eg. $M12
       *
       * $ = enable cell diff mode
       * M = the cell value
       * 0 = x position
       * 2 = y position
       */
      case ReplayDataMode.Cell: {
        const [value, x, y] = dataUnit;
        const cell = {
          x: decodeNumber(x),
          y: decodeNumber(y),
          value,
        };

        changedCells.push(cell);
        break;
      }
    }
  };

  /**
   * Combines current data into levelData
   */
  const outputLevelData = () => {
    if (!boardData) {
      throw new Error("Cannot output level data without board data");
    }

    if (!prevLevelData) {
      prevLevelData = `${"X".repeat(boardData.width)}\n`.repeat(
        boardData.height
      );
      levelDataByTime[MIN_TIME] = prevLevelData;
    }

    const levelData2dArray = prevLevelData
      .split("\n")
      .map((row) => row.split(""));

    for (const changedCell of changedCells) {
      levelData2dArray[changedCell.y][changedCell.x] = changedCell.value;
    }

    const levelData = levelData2dArray.map((row) => row.join("")).join("\n");

    levelDataByTime[time] = levelData;

    prevLevelData = levelData;
  };

  /**
   * Combines current data into cell id of the a user interaction
   */
  const outputInteraction = () => {
    if (!target) {
      return;
    }

    targetsByTime[time] = createCellId(target);
  };

  /**
   * Reads the stream one character at a time
   */
  const readReplayDataStream = (head?: string) => {
    switch (head) {
      // collect data into dataUnit until we detect a new mode
      default:
        dataUnit += head;
        return;

      // we are switching to a new mode, so we should process the current data
      // unit and start a new data unit
      case ReplayDataMode.Board:
      case ReplayDataMode.Interaction:
      case ReplayDataMode.Time:
      case ReplayDataMode.Cell:
      case ReplayDataMode.Win:
      case ReplayDataMode.Lose:
      case undefined: {
        const hasCellDiff = !!changedCells.length;
        const hasWon = head === "W";
        const hasLost = head === "L";
        const hasFinishedCellDiff = mode !== "$";

        // output a new frame if we have enough data to do so
        if (hasCellDiff && (hasFinishedCellDiff || hasWon || hasLost)) {
          outputLevelData();
          outputInteraction();

          target = undefined;
          time += 1;
          changedCells = [];
        }

        // process the previous unit of data if we have one
        if (dataUnit) {
          processDataUnit(dataUnit, mode);
        }

        // start collecting data for the new mode
        if (head) {
          mode = head;
          dataUnit = "";
        }
      }
    }
  };

  // fake stream the data
  for (let i = 0; i < data.length; i++) {
    readReplayDataStream(data[i]);
  }

  // end of stream
  readReplayDataStream();

  return { levelDataByTime, targetsByTime };
}

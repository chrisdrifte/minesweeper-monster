import { loadGameState } from "./loadGameState";

describe("loadGameState", () => {
  it("should throw error if level data has inconsistent columns", () => {
    expect(() => {
      loadGameState(`
        XXX
        XX
      `);
    }).toThrow();
  });

  it("should generate correct width", () => {
    const gameState = loadGameState(`
      XXX
      XXX
    `);

    expect(gameState.width).toBe(3);
  });

  it("should generate correct height", () => {
    const gameState = loadGameState(`
      XXX
      XXX
    `);

    expect(gameState.height).toBe(2);
  });

  it("should generate correct cells", () => {
    const gameState = loadGameState(`
      XXX
      1MF
    `);

    expect(gameState.cells).toEqual([
      expect.objectContaining({ state: "hidden", x: 0, y: 0 }),
      expect.objectContaining({ state: "hidden", x: 1, y: 0 }),
      expect.objectContaining({ state: "hidden", x: 2, y: 0 }),
      expect.objectContaining({ state: "visible", count: 1, x: 0, y: 1 }),
      expect.objectContaining({ state: "hidden", x: 1, y: 1 }),
      expect.objectContaining({ state: "flagged", x: 2, y: 1 }),
    ]);
  });
});

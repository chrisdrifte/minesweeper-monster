import GamePlayWithRestart from "@/components/game/GamePlayWithRestart";

export default async function CustomGamePage() {
  const customSettings = {
    width: 10,
    height: 15,
    numMines: 25,
    safeFirstClick: true,
    revealContiguousNumbers: true,
  };

  return (
    <GamePlayWithRestart
      settings={customSettings}
      settingsHref="/play/custom/settings"
    />
  );
}

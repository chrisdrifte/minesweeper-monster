import GamePlayWithRestart from "@/components/game/GamePlayWithRestart";

export default async function CustomGamePage() {
  const customSettings = {
    width: 10,
    height: 15,
    numMines: 20,
  };

  return (
    <GamePlayWithRestart
      settings={customSettings}
      settingsHref="/play/custom/settings"
    />
  );
}

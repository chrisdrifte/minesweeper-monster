import CustomGameClient from "./CustomGameClient";
import { Suspense } from "react";
import { getCustomSettings } from "@/game/settings/getCustomSettings";

export default async function CustomGamePage() {
  const initialCustomSettings = getCustomSettings();

  return (
    <Suspense>
      <CustomGameClient initialCustomSettings={initialCustomSettings} />
    </Suspense>
  );
}

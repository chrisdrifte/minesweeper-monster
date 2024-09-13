"use client";

import { ButtonWrapper } from "@/components/navigation/ButtonWrapper";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { FormButton } from "@/components/navigation/FormButton";
import { FormField } from "@/components/navigation/FormField";
import { GameSettings } from "@/types/GameSettings";
import { Heading } from "@/components/layout/Heading";
import { InputCheckbox } from "@/components/navigation/InputCheckbox";
import { InputNumber } from "@/components/navigation/InputNumber";
import { defaultCustomSettings } from "@/game/settings/defaultCustomSettings";
import { useCustomSettings } from "@/game/settings/useCustomSettings";
import { useState } from "react";

export default function CustomSettings() {
  const { customSettings, setCustomSettings } = useCustomSettings();

  const [width, setWidth] = useState(String(customSettings.width ?? ""));
  const [height, setHeight] = useState(String(customSettings.height ?? ""));
  const [numMines, setNumMines] = useState(
    String(customSettings.numMines ?? "")
  );

  const [showTimer, setShowTimer] = useState(customSettings.showTimer ?? "");

  const [safeFirstClick, setSafeFirstClick] = useState(
    customSettings.safeFirstClick
  );

  const [revealContiguousNumbers, setRevealContiguousNumbers] = useState(
    customSettings.revealContiguousNumbers
  );

  const [autoRestart, setAutoRestart] = useState(customSettings.autoRestart);

  const [timeLimit, setTimeLimit] = useState(String(customSettings.timeLimit));

  const handleSaveSettings = () => {
    const nextCustomSettings: GameSettings = {
      width: parseInt(width),
      height: parseInt(height),
      numMines: parseInt(numMines),
      showTimer,
      safeFirstClick,
      revealContiguousNumbers,
      autoRestart,
      timeLimit: parseInt(timeLimit),
    };

    if (isNaN(nextCustomSettings.width) || nextCustomSettings.width < 10) {
      return;
    }

    if (isNaN(nextCustomSettings.height) || nextCustomSettings.height < 10) {
      return;
    }

    if (isNaN(nextCustomSettings.numMines) || nextCustomSettings.numMines < 1) {
      return;
    }

    if (
      isNaN(nextCustomSettings.timeLimit) ||
      nextCustomSettings.timeLimit < 0
    ) {
      return;
    }

    setCustomSettings(nextCustomSettings);

    requestAnimationFrame(() => {
      window.location.href = "/play/custom";
    });
  };

  const handleResetSettings = () => {
    setCustomSettings(defaultCustomSettings);

    requestAnimationFrame(() => {
      window.location.href = "/play/custom";
    });
  };

  return (
    <form>
      <ContentBlock>
        <Heading>Board</Heading>

        <div className="grid sm:grid-cols-3 gap-4 grid-cols-1">
          <FormField label="Width" isCentered>
            <InputNumber value={width} onChange={setWidth} />
          </FormField>

          <FormField label="Height" isCentered>
            <InputNumber value={height} onChange={setHeight} />
          </FormField>

          <FormField label="Mines" isCentered>
            <InputNumber value={numMines} onChange={setNumMines} />
          </FormField>
        </div>
      </ContentBlock>

      <ContentBlock>
        <Heading>Rules</Heading>

        <FormField label="Show timer">
          <InputCheckbox checked={showTimer} onChange={setShowTimer} />
        </FormField>

        <FormField label="No mine on first click">
          <InputCheckbox
            checked={safeFirstClick}
            onChange={setSafeFirstClick}
          />
        </FormField>

        <FormField label="Reveal contiguous numbers">
          <InputCheckbox
            checked={revealContiguousNumbers}
            onChange={setRevealContiguousNumbers}
          />
        </FormField>

        <FormField label="Restart automatically on loss">
          <InputCheckbox checked={autoRestart} onChange={setAutoRestart} />
        </FormField>

        <FormField label="Time limit (seconds)">
          <InputNumber
            value={timeLimit}
            onChange={setTimeLimit}
            maxLength={4}
          />
        </FormField>
      </ContentBlock>

      <ButtonWrapper>
        <FormButton text="Save settings" onClick={handleSaveSettings} />
        <FormButton text="Use default settings" onClick={handleResetSettings} />
      </ButtonWrapper>
    </form>
  );
}

"use client";

import { ButtonWrapper } from "@/components/layout/ButtonWrapper";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { FormButton } from "@/components/form/FormButton";
import { FormField } from "@/components/form/FormField";
import { GameSettings } from "@/types/GameSettings";
import { Heading } from "@/components/layout/Heading";
import { InputCheckbox } from "@/components/form/InputCheckbox";
import { InputNumber } from "@/components/form/InputNumber";
import { board } from "@/config/board";
import { defaultCustomSettings } from "@/game/settings/defaultCustomSettings";
import { useCustomSettings } from "@/game/settings/useCustomSettings";
import { useState } from "react";

export default function CustomSettings() {
  const { customSettings, setCustomSettings } = useCustomSettings();

  const [width, setWidth] = useState(
    String(customSettings.width ?? defaultCustomSettings.width)
  );
  const [height, setHeight] = useState(
    String(customSettings.height ?? defaultCustomSettings.height)
  );
  const [numMines, setNumMines] = useState(
    String(customSettings.numMines ?? defaultCustomSettings.numMines)
  );

  const [timeLimit, setTimeLimit] = useState(
    String(customSettings.timeLimit ?? defaultCustomSettings.timeLimit)
  );

  const [showTimer, setShowTimer] = useState(customSettings.showTimer);

  const [safeFirstClick, setSafeFirstClick] = useState(
    customSettings.safeFirstClick
  );

  const [revealContiguousNumbers, setRevealContiguousNumbers] = useState(
    customSettings.revealContiguousNumbers
  );

  const [autoRestart, setAutoRestart] = useState(customSettings.autoRestart);

  const handleSaveSettings = () => {
    const nextCustomSettings: GameSettings = {
      width: Math.min(parseInt(width), board.maxWidth),
      height: Math.min(parseInt(height), board.maxHeight),
      numMines: parseInt(numMines),
      showTimer,
      safeFirstClick,
      revealContiguousNumbers,
      revealBoardOnLoss: true,
      autoRestart,
      timeLimit: parseInt(timeLimit),
    };

    if (isNaN(nextCustomSettings.width) || nextCustomSettings.width < 9) {
      return;
    }

    if (isNaN(nextCustomSettings.height) || nextCustomSettings.height < 9) {
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

        <FormField label="Time limit (seconds)">
          <InputNumber
            value={timeLimit}
            onChange={setTimeLimit}
            maxLength={4}
          />
        </FormField>

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
      </ContentBlock>

      <ButtonWrapper>
        <FormButton text="Save settings" onClick={handleSaveSettings} />
        <FormButton text="Use default settings" onClick={handleResetSettings} />
      </ButtonWrapper>
    </form>
  );
}

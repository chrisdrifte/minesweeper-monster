"use client";

import { ContentBlock } from "@/components/layout/ContentBlock";
import { FormButton } from "@/components/navigation/FormButton";
import { FormField } from "@/components/navigation/FormField";
import { Heading } from "@/components/layout/Heading";
import { InputCheckbox } from "@/components/navigation/InputCheckbox";
import { InputNumber } from "@/components/navigation/InputNumber";
import { useState } from "react";

export default function CustomSettings() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(15);
  const [numMines, setNumMines] = useState(50);

  const [safeFirstClick, setSafeFirstClick] = useState(true);
  const [revealContiguousNumbers, setRevealContiguousNumbers] = useState(false);

  const handleSaveSettings = () => {
    window.location.href = "/play/custom";
  };

  return (
    <form>
      <ContentBlock>
        <Heading>Board</Heading>

        <div className="grid grid-cols-3 gap-4">
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
      </ContentBlock>

      <FormButton text="Save settings" onClick={handleSaveSettings} />
    </form>
  );
}

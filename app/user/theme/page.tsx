"use client";

import { Annotation } from "@/types/Annotation";
import { BoardWrapper } from "@/components/game/BoardWrapper";
import { ButtonWrapper } from "@/components/navigation/ButtonWrapper";
import { Cell } from "@/types/Cell";
import { CellId } from "@/types/CellId";
import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { FormButton } from "@/components/navigation/FormButton";
import { Heading } from "@/components/layout/Heading";
import { RenderCell } from "@/components/cells/RenderCell";
import { createCellId } from "@/helpers/createCellId";
import { themes } from "@/game/theme/themes";
import { useCurrentTheme } from "@/game/theme/useCurrentTheme";

export default function ThemePage() {
  const currentTheme = useCurrentTheme();

  const handleUpdateTheme = (themeId: string) => {
    currentTheme.set(themeId);

    document.querySelector("html")?.setAttribute("data-theme", themeId);
  };

  const cols = 4;

  const createCell = (i: number, cellProps: Omit<Cell, "id" | "x" | "y">) => ({
    id: createCellId({ x: i % cols, y: Math.floor(i / cols) }),
    x: i % cols,
    y: 0,
    ...cellProps,
  });

  let i = 0;

  const cells: Cell[] = [
    createCell(i++, {
      state: "hidden",
    }),
    createCell(i++, {
      state: "hidden",
    }),
    createCell(i++, {
      state: "hidden",
    }),
    createCell(i++, {
      state: "hidden",
    }),
    createCell(i++, {
      state: "flagged",
    }),
    createCell(i++, {
      state: "visible",
      hasMine: true,
    }),
    createCell(i++, {
      state: "hidden",
    }),
    createCell(i++, {
      state: "visible",
      count: 0,
    }),
    createCell(i++, {
      state: "visible",
      count: 1,
    }),
    createCell(i++, {
      state: "visible",
      count: 2,
    }),
    createCell(i++, {
      state: "visible",
      count: 3,
    }),
    createCell(i++, {
      state: "visible",
      count: 4,
    }),
    createCell(i++, {
      state: "visible",
      count: 5,
    }),
    createCell(i++, {
      state: "visible",
      count: 6,
    }),
    createCell(i++, {
      state: "visible",
      count: 7,
    }),
    createCell(i++, {
      state: "visible",
      count: 8,
    }),
  ];

  const annotations: Record<CellId, Annotation> = {
    "1,0": "mine",
    "2,0": "safe",
    "3,0": "info",
  };

  return (
    <>
      <ContentBlock>
        <Heading>Select Theme</Heading>

        <br />

        <Center>
          <BoardWrapper width={cols} height={Math.round(cells.length / cols)}>
            {cells.map((cell) => (
              <RenderCell
                key={cell.id}
                cell={cell}
                annotation={annotations[cell.id]}
                isHighlighted={cell.id === "2,1"}
                action={cell.id === "0,0" ? "dig" : undefined}
              />
            ))}
          </BoardWrapper>
        </Center>

        <br />

        <ButtonWrapper key={currentTheme.id}>
          {themes.map((theme) => (
            <FormButton
              key={theme.id}
              text={theme.name}
              isActive={theme.id === currentTheme.id}
              onClick={() => handleUpdateTheme(theme.id)}
            />
          ))}
        </ButtonWrapper>
      </ContentBlock>
    </>
  );
}

"use client";

import { ButtonWrapper } from "@/components/layout/ButtonWrapper";
import { FormButton } from "@/components/form/FormButton";
import { Theme } from "@/game/theme/types/Theme";
import { themes } from "@/game/theme/themes";
import { useCurrentTheme } from "@/game/theme/useCurrentTheme";

export type SelectThemeProps = {
  initialTheme: Theme;
};

export function SelectTheme({ initialTheme }: SelectThemeProps) {
  const currentTheme = useCurrentTheme(initialTheme);
  return (
    <ButtonWrapper key={currentTheme.id}>
      {themes.map((theme) => (
        <FormButton
          key={theme.id}
          text={theme.name}
          isActive={theme.id === currentTheme.id}
          onClick={() => currentTheme.set(theme.id)}
        />
      ))}
    </ButtonWrapper>
  );
}

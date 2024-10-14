import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { Heading } from "@/components/layout/Heading";
import { SelectTheme } from "../../../components/theme/SelectTheme";
import { ThemePreview } from "@/components/theme/ThemePreview";
import { getCurrentTheme } from "@/game/theme/getCurrentTheme";

export default function ThemePage() {
  const initialTheme = getCurrentTheme();

  return (
    <>
      <ContentBlock>
        <Heading>Select Theme</Heading>

        <br />

        <Center>
          <ThemePreview />
        </Center>

        <br />

        <SelectTheme initialTheme={initialTheme} />
      </ContentBlock>
    </>
  );
}

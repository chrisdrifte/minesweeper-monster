import { ContentBlock } from "@/components/layout/ContentBlock";
import { ControlBinding } from "@/components/layout/ControlBinding";
import { Heading } from "@/components/layout/Heading";
import { Paragraph } from "@/components/layout/Paragraph";

export default function TermsPage() {
  return (
    <>
      <ContentBlock>
        <Heading>Terms & conditions</Heading>
        <br />
        <Heading>Pricing</Heading>
        <Paragraph>Monster minesweeper is free to play.</Paragraph>
      </ContentBlock>

      <ContentBlock>
        <Heading>Cookies</Heading>
        <Paragraph>
          Monster minesweeper stores the following essential cookies.
        </Paragraph>

        <table className="w-full my-8 gap-8 border-separate border-spacing-y-4">
          <thead>
            <tr>
              <th className="text-left w-1/3">Cookie</th>
              <th className="text-left">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>
                <hr className="border-fg-50" />
              </td>
            </tr>
            <tr>
              <td>
                <ControlBinding>campaign-level</ControlBinding>
              </td>
              <td>
                The current level the player has reached in campaign mode.
              </td>
            </tr>
            <tr>
              <td>
                <ControlBinding>custom-settings</ControlBinding>
              </td>
              <td>
                The custom settings the player has selected in monster
                minesweeper mode.
              </td>
            </tr>
            <tr>
              <td>
                <ControlBinding>daily-solution</ControlBinding>
              </td>
              <td>
                The solution the player has provided in daily puzzle mode.
              </td>
            </tr>
            <tr>
              <td>
                <ControlBinding>theme-id</ControlBinding>
              </td>
              <td>The theme the player has selected.</td>
            </tr>
            <tr>
              <td>
                <ControlBinding>disable-holiday-theme</ControlBinding>
              </td>
              <td>
                Whether the player has chosen not to use the current holiday
                theme.
              </td>
            </tr>
          </tbody>
        </table>

        <Paragraph>
          Monster minesweeper does not store any non-essential cookies.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <Heading>Tracking & Analytics</Heading>

        <Paragraph>
          Monster minesweeper collects anonymous usage data including, but not
          limited to, page loads, number of games and game outcomes, user theme,
          custom settings, screen size, and country.
        </Paragraph>

        <Paragraph>
          This data is collected to help improve game features, and is not sold
          or otherwise used for marketing purposes.
        </Paragraph>
      </ContentBlock>

      <ContentBlock>
        <Heading>Fair play policy</Heading>

        <Paragraph>
          Monster minesweeper does not include any social features or allow
          players to interact with one another.
        </Paragraph>

        <Paragraph>
          Nevertheless, any use of the monster minesweeper game and associated
          assets which deliberately causes harm is expressly prohibited.
        </Paragraph>
      </ContentBlock>
    </>
  );
}

import classNames from "classnames";

export type ParagraphProps = {
  align?: "left" | "center";
};

export function Paragraph({
  align = "left",
  children,
}: React.PropsWithChildren<ParagraphProps>) {
  return (
    <p
      className={classNames(
        {
          "text-center": align === "center",
        },
        "my-8"
      )}
    >
      {children}
    </p>
  );
}

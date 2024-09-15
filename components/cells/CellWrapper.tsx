import { Annotation } from "@/types/Annotation";
import classNames from "classnames";
import { noop } from "@/helpers/noop";

export type CellWrapperProps = {
  isHighlighted?: boolean;
  isExploded?: boolean;
  background?: "none" | "fg" | "red";
  annotation?: Annotation;
  onClick?: VoidFunction;
  onAltClick?: VoidFunction;
};

export function CellWrapper({
  children,
  isHighlighted = false,
  isExploded = false,
  background = "none",
  annotation,
  onClick = noop,
  onAltClick = noop,
}: React.PropsWithChildren<CellWrapperProps>) {
  return (
    <div
      className={classNames(
        {
          "bg-fg-100": background === "fg",
          "bg-red": background === "red",
          "border-blue border-4": annotation === "info",
          "border-red border-4": annotation === "mine",
          "border-green border-4": annotation === "safe",
          "animate-explode": isExploded,
        },
        "size-7 text-bg border-bg m-0.5 cursor-pointer rounded-sm"
      )}
      style={isExploded ? { animationDelay: `${Math.random() * 100}ms` } : {}}
      onMouseDown={(e) => {
        const LEFT_BUTTON = 0;
        const RIGHT_BUTTON = 2;

        switch (e.nativeEvent.button) {
          case LEFT_BUTTON:
            if (e.ctrlKey) {
              return onAltClick();
            }

            return onClick();

          case RIGHT_BUTTON:
            return onAltClick();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div
        className={classNames(
          {
            "before:bg-orange before:content-[''] before:block before:absolute before:w-full before:h-full motion-safe:before:animate-ping before:rounded-sm relative":
              isHighlighted,
          },
          "size-full flex items-center justify-center"
        )}
      >
        {children}
      </div>
    </div>
  );
}

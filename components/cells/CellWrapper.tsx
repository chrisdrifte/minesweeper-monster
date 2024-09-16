import { Annotation } from "@/types/Annotation";
import classNames from "classnames";
import { noop } from "@/helpers/noop";

export type CellWrapperProps = {
  isHighlighted?: boolean;
  isExploded?: boolean;
  variant?: "none" | "hidden" | "mine" | "flag";
  annotation?: Annotation;
  onClick?: VoidFunction;
  onAltClick?: VoidFunction;
};

export function CellWrapper({
  children,
  isHighlighted = false,
  isExploded = false,
  variant = "none",
  annotation,
  onClick = noop,
  onAltClick = noop,
}: React.PropsWithChildren<CellWrapperProps>) {
  return (
    <div
      className={classNames(
        {
          "bg-hidden-bg": variant === "hidden",
          "bg-mine-bg": variant === "mine",
          "bg-flag-bg": variant === "flag",
          "border-annotate-info border-4 border-dashed": annotation === "info",
          "border-annotate-mine border-4": annotation === "mine",
          "border-annotate-safe border-4": annotation === "safe",
          "animate-explode": isExploded,
        },
        "size-7 text-bg m-0.5 cursor-pointer rounded-sm"
      )}
      style={isExploded ? { animationDelay: `${Math.random() * 100}ms` } : {}}
      onPointerUp={(e) => {
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
            "before:bg-highlight-click before:content-[''] before:block before:absolute before:w-full before:h-full motion-safe:before:animate-ping before:rounded-sm relative":
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

import { Annotation } from "@/types/Annotation";
import classNames from "classnames";
import { noop } from "@/helpers/noop";

export type CellWrapperProps = {
  isHighlighted?: boolean;
  background?: "none" | "white" | "red";
  annotation?: Annotation;
  onClick?: VoidFunction;
  onAltClick?: VoidFunction;
};

export function CellWrapper({
  children,
  isHighlighted = false,
  background = "none",
  annotation,
  onClick = noop,
  onAltClick = noop,
}: React.PropsWithChildren<CellWrapperProps>) {
  return (
    <div
      className={classNames(
        {
          "bg-white": background === "white",
          "bg-red-500": background === "red",
          "border-red-500 border-4": annotation === "mine",
          "border-green-500 border-4":
            annotation === "safe" || annotation === "info",
        },
        "size-6 text-black border-black m-1 cursor-pointer rounded-sm"
      )}
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
            "before:bg-orange-500 before:content-[''] before:block before:absolute before:w-full before:h-full motion-safe:before:animate-ping relative":
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

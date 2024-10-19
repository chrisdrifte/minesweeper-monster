import { useEffect, useRef } from "react";

import classNames from "classnames";
import { createCellId } from "@/helpers/createCellId";
import { noop } from "@/helpers/noop";
import useWindowSize from "@/hooks/useWindowSize";

export type BoardWrapperProps = {
  width: number;
  height: number;
  scroll?: { x: number; y: number };
  cursor?: { x: number; y: number };
  interactions?: { x: number; y: number }[];
  isInteractive?: boolean;
  hasControls?: boolean;
  onScrollEnd?: (x: number, y: number) => void;
  onInteractionEnd?: () => void;
};

export function BoardWrapper({
  children,
  width,
  height,
  scroll = { x: 0, y: 0 },
  cursor,
  interactions = [],
  isInteractive = false,
  hasControls = false,
  onScrollEnd = noop,
  onInteractionEnd = noop,
}: React.PropsWithChildren<BoardWrapperProps>) {
  const { width: windowWidth } = useWindowSize();

  const maxWidth = windowWidth - 32;
  const requiredWidth = width * 32 + 24;
  const responsiveWidth = Math.max(0, Math.min(requiredWidth, maxWidth));

  const isScrollable = width && requiredWidth > maxWidth;

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleScroll = (x: number, y: number) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onScrollEnd(x, y), 100);
  };

  const scrollElementRef = useRef<HTMLDivElement>(null);
  const { x, y } = scroll;

  useEffect(() => {
    scrollElementRef.current?.scrollTo({
      top: y,
      left: x,
      behavior: cursor ? "smooth" : "instant",
    });
  }, [x, y]);

  return (
    <div
      id="#board"
      className={classNames(
        {
          // prevents mouse events if not interactive
          "sm:pointer-events-none": !isInteractive,

          // places a triangle in the bottom-left to create an outer corner without removing the inner curve
          "before:content-[''] before:block before:absolute before:-bottom-1 before:-left-1 before:border-fg-100 before:size-[0px] before:border-r-transparent before:border-t-transparent before:border-4":
            hasControls,

          // places a triangle in the bottom-right to create an outer corner without removing the inner curve
          "after:content-[''] after:block after:absolute after:-bottom-1 after:-right-1 after:border-fg-100 after:size-[0px] after:border-l-transparent after:border-t-transparent after:border-4":
            hasControls,

          // shrinks the board area if no controls are present
          "w-full": hasControls,
          "w-min": !hasControls,
        },
        "relative border-4 rounded-lg border-fg-100 h-min p-2 flex justify-center select-none"
      )}
      style={responsiveWidth ? { width: responsiveWidth } : undefined}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div
        ref={scrollElementRef}
        className={classNames(
          { "overflow-auto overscroll-none": isScrollable },
          "relative"
        )}
        onScroll={(e) =>
          handleScroll(e.currentTarget.scrollLeft, e.currentTarget.scrollTop)
        }
      >
        <div
          className={"grid items-start justify-start"}
          style={{
            gridTemplateColumns: `repeat(${width}, 32px)`,
            gridTemplateRows: `repeat(${height}, 32px)`,
          }}
        >
          {children}
        </div>
        {cursor && (
          <div
            className="opacity-50 absolute left-0 top-0 rounded-sm size-8 duration-200 ease-in-out"
            style={{
              transform: `translate(${cursor.x * 32}px, ${cursor.y * 32}px)`,
            }}
          >
            <div
              key={createCellId(cursor)}
              className={classNames(
                "animate-spectral bg-fg-alt size-full duration-300"
              )}
            ></div>
          </div>
        )}

        {!!interactions.length && (
          <div className="size-full absolute top-0 left-0">
            {interactions.map((interaction) => (
              <div
                key={createCellId(interaction)}
                className="animate-interact border-4 border-highlight-click absolute rounded-sm size-7"
                style={{
                  left: `${interaction.x * 32 + 2}px`,
                  top: `${interaction.y * 32 + 2}px`,
                }}
                onAnimationEnd={onInteractionEnd}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

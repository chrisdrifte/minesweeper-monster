import classNames from "classnames";

export type MenuWrapperProps = {
  isHorizontal?: boolean;
};

export function MenuWrapper({
  isHorizontal = false,
  children,
}: React.PropsWithChildren<MenuWrapperProps>) {
  return (
    <nav
      className={classNames(
        {
          "space-x-4 justify-stretch": isHorizontal,
          "flex-col space-y-4": !isHorizontal,
        },
        "flex w-full mt-8"
      )}
    >
      {children}
    </nav>
  );
}

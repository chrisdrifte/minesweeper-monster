import classNames from "classnames";

export type ButtonWrapperProps = {
  isHorizontal?: boolean;
};

export function ButtonWrapper({
  isHorizontal = false,
  children,
}: React.PropsWithChildren<ButtonWrapperProps>) {
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

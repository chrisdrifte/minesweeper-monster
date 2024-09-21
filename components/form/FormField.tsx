import classNames from "classnames";

export type FormFieldProps = {
  label: string;
  isCentered?: boolean;
};

export function FormField({
  children,
  label,
  isCentered = false,
}: React.PropsWithChildren<FormFieldProps>) {
  return (
    <label
      className={classNames(
        {
          "grid-cols-[1fr_minmax(80px,min-content)]": !isCentered,
          "grid-cols-2": isCentered,
        },
        "grid grid-cols-2 gap-4 my-4 text-xl"
      )}
    >
      <span
        className={classNames(
          {
            "sm:justify-self-end": isCentered,
          },
          "self-center justify-self-start"
        )}
      >
        {label}
      </span>
      <span
        className={classNames(
          {
            "sm:justify-self-start": isCentered,
          },
          "self-center justify-self-end"
        )}
      >
        {children}
      </span>
    </label>
  );
}

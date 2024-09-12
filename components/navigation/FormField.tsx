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
    <label className="grid grid-cols-2 gap-4 my-4 text-xl">
      <span
        className={classNames({
          "self-center justify-self-start": !isCentered,
          "self-center justify-self-end": isCentered,
        })}
      >
        {label}
      </span>
      <span
        className={classNames({
          "self-center justify-self-end": !isCentered,
          "self-center justify-self-start": isCentered,
        })}
      >
        {children}
      </span>
    </label>
  );
}

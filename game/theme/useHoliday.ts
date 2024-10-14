export function useHoliday(): "halloween" | undefined {
  const [date] = new Date().toISOString().split("T");
  const [, mm, dd] = date.split("-");

  switch (`${mm}-${dd}`) {
    case "10-31":
      return "halloween";
  }
}

export default function getDateFromForm(
  form: HTMLFormElement,
  separatePickers: boolean
): string | null {
  const formData = new FormData(form);
  if (separatePickers) {
    const year = formData.get("year")?.toString();
    const month = formData.get("month")?.toString();
    const day = formData.get("day")?.toString();
    if (!year || !month || !day) {
      return null;
    }
    return `${year}-${month}-${day}`;
  } else {
    return formData.get("birthDate")?.toString() ?? null;
  }
}

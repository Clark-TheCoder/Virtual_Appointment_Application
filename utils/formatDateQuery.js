export function formatDateQuery(date) {
  const { year, month, day } = date;

  const paddedYear = String(year).padStart(4, "0");

  if (year && month && day) {
    const paddedMonth = String(month).padStart(2, "0");
    const paddedDay = String(day).padStart(2, "0");
    return { exactDate: `${paddedYear}-${paddedMonth}-${paddedDay}` };
  }

  if (year && month && !day) {
    const numericMonth = Number(month);
    let nextMonth = numericMonth === 12 ? 1 : numericMonth + 1;
    let nextYear = numericMonth === 12 ? Number(year) + 1 : Number(year);

    const paddedMonth = String(numericMonth).padStart(2, "0");
    const paddedNextMonth = String(nextMonth).padStart(2, "0");
    const paddedNextYear = String(nextYear).padStart(4, "0");

    return {
      startRange: `${paddedYear}-${paddedMonth}-01`,
      endRange: `${paddedNextYear}-${paddedNextMonth}-01`,
    };
  }

  return null;
}

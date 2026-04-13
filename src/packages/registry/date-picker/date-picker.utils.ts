export function isSameDay(a: Date | null, b: Date) {
  return a ? a.toDateString() === b.toDateString() : false;
}

export function isBetween(date: Date, start: Date, end: Date) {
  return date > start && date < end;
}

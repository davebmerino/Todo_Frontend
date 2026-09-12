const relativeFormatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

export function formatFullDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatShortDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

// "Today" / "Tomorrow" / "in 3 days" / "Mar 12" — the closer a due date is,
// the more useful a relative label is; far-out dates read better as a date.
export function formatDueLabel(dueDate) {
  if (!dueDate) return null;

  const due = new Date(dueDate);
  const today = new Date();
  const startOfDue = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const dayDiff = Math.round(
    (startOfDue - startOfToday) / (1000 * 60 * 60 * 24),
  );

  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Tomorrow";
  if (dayDiff === -1) return "Yesterday";
  if (dayDiff > 1 && dayDiff <= 6)
    return relativeFormatter.format(dayDiff, "day");
  return formatShortDate(due);
}

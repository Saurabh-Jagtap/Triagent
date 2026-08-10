export const buildPlannerContext = () => {
  const now = new Date();

  const timezone = "Asia/Kolkata";

  const currentDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const currentTime = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(now);

  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
  }).format(now);

  return `
Current Date: ${currentDate}
Current Day: ${weekday}
Current Time: ${currentTime}
Timezone: ${timezone}

Resolve all relative time expressions (today, tomorrow, next Monday, next week, etc.) using the above context.
Examples:
- "today" refers to the current date.
- "tomorrow" refers to one day after the current date.
- "next Monday" refers to the upcoming Monday after today.
- All dates and times should be interpreted in the specified timezone.

`;
};
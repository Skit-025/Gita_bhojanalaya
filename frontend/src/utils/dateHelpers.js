/**
 * Utility functions for date calculations matching backend logic.
 */

/**
 * Convert a Date object to a local YYYY-MM-DD string.
 * IMPORTANT: Do NOT use toISOString().split('T')[0] because
 * toISOString() converts to UTC, which shifts the date back by
 * 1 day for timezones ahead of UTC (e.g. IST UTC+5:30).
 */
export const toLocalDateStr = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Determine whether current selection window is open (Saturday = 5, Sunday = 6)
export const isSelectionWindowOpen = (dateObj = new Date()) => {
  const day = dateObj.getDay(); // 0 is Sunday, 6 is Saturday
  return day === 0 || day === 6;
};

// Get target Monday (start of target week)
// Saturday (6) or Sunday (0): Returns upcoming Monday
// Monday (1) to Friday (5): Returns current week Monday
export const getUpcomingWeekStart = (dateObj = new Date()) => {
  const current = new Date(dateObj);
  const day = current.getDay(); // 0 (Sun) to 6 (Sat)
  
  if (day === 0) { // Sunday -> tomorrow Monday (+1)
    const monday = new Date(current);
    monday.setDate(current.getDate() + 1);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }
  if (day === 6) { // Saturday -> in 2 days Monday (+2)
    const monday = new Date(current);
    monday.setDate(current.getDate() + 2);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  // Monday (1) to Friday (5): Current week Monday
  const diffToMonday = 1 - day;
  const monday = new Date(current);
  monday.setDate(current.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

// Generate array of 7 dates for target Monday -> Sunday
export const getUpcomingWeekDays = (dateObj = new Date()) => {
  const monday = getUpcomingWeekStart(dateObj);
  const days = [];

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = toLocalDateStr(d);

    days.push({
      dayName: dayNames[i],
      dateStr: dateStr,
      formattedDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  }

  return days;
};

export const formatDatePretty = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

/**
 * Convert ISO date string to French format using Intl API
 * @param isoDate - ISO date string
 * @returns Formatted date string (e.g., "09/03/2026")
 */

export function formatDateFR(isoDate: string): string {
  console.log("isoDate :", isoDate);
  try {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) {
      return isoDate;
    }

    // Utiliser Intl.DateTimeFormat pour le format français
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return isoDate;
  }
}

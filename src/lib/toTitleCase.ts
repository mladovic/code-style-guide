/**
 * Converts a kebab-case string to title case.
 * Handles multiple consecutive dashes and trims the input.
 *
 * @param {string} str - The dash-case string to convert.
 * @returns {string} The converted title case string.
 */
export function toTitleCase(str: string) {
  if (typeof str !== "string") {
    throw new TypeError("Input must be a string");
  }

  return str
    .trim()
    .split("-")
    .filter((word) => word.length > 0)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

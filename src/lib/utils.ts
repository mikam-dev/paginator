import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a string as a phone number.
 * 
 * @param {string} value - The input string to format.
 * @returns {string} The formatted phone number.
 */
export function formatPhoneNumber(value: string) {
  // Remove all non-digit characters and limit length to 10
  const cleaned = value.replace(/\D/g, '').slice(0, 10);

  // Format the string
  let match = cleaned.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);

  if (match) {
    return `(${match[1]}${match[2] ? ') ' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
  }

  return value;
}

/**
 * Formats a string as a zip code.
 * 
 * @param {string} value - The input string to format.
 * @returns {string} The formatted zip code.
 */
export function formatZipCode(value: string) {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '').slice(0, 5);

  // Check if the input is of correct length
  let match = cleaned.match(/^(\d{1,5})$/);

  if (match) {
    return `${match[1]}`;
  }

  return value;
}

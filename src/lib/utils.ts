import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts raw error messages to safe, user-friendly messages
 * to prevent information disclosure about internal implementation details.
 */
export const getSafeErrorMessage = (error: unknown): string => {
  // Log full error for debugging (only visible in dev console, not exposed to users)
  console.error('Operation error:', error);
  
  const message = (error as { message?: string })?.message?.toLowerCase() || '';
  
  // Map specific error patterns to safe messages
  if (message.includes('invalid login credentials') || message.includes('invalid_credentials')) {
    return 'Invalid email or password. Please try again.';
  }
  if (message.includes('email not confirmed')) {
    return 'Please confirm your email address before logging in.';
  }
  if (message.includes('auth') || message.includes('password') || message.includes('credentials')) {
    return 'Authentication failed. Please check your credentials.';
  }
  if (message.includes('duplicate') || message.includes('unique') || message.includes('already exists')) {
    return 'This record already exists.';
  }
  if (message.includes('violates') || message.includes('constraint')) {
    return 'Invalid input. Please check your data and try again.';
  }
  if (message.includes('permission') || message.includes('denied') || message.includes('policy')) {
    return 'You do not have permission to perform this action.';
  }
  if (message.includes('not found') || message.includes('does not exist')) {
    return 'The requested resource was not found.';
  }
  if (message.includes('network') || message.includes('timeout') || message.includes('connection')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  // Generic fallback - never expose raw error messages
  return 'An error occurred. Please try again or contact support.';
};

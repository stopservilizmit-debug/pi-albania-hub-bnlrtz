
// Simplified error logging for runtime errors
// This version is more stable and won't cause crashes

import { Platform } from "react-native";

// Declare __DEV__ global (React Native global for development mode detection)
declare const __DEV__: boolean;

// Simple debouncing to prevent duplicate logs
const recentLogs: { [key: string]: boolean } = {};
const clearLogAfterDelay = (logKey: string) => {
  setTimeout(() => delete recentLogs[logKey], 100);
};

// Messages to mute (noisy warnings that don't help debugging)
const MUTED_MESSAGES = [
  'each child in a list should have a unique "key" prop',
  'Each child in a list should have a unique "key" prop',
];

// Check if a message should be muted
const shouldMuteMessage = (message: string): boolean => {
  return MUTED_MESSAGES.some(muted => message.includes(muted));
};

// Helper to safely stringify arguments
const stringifyArgs = (args: any[]): string => {
  return args.map(arg => {
    if (typeof arg === 'string') return arg;
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    try {
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
  }).join(' ');
};

export const setupErrorLogging = () => {
  // Only initialize in development mode
  if (!__DEV__) {
    return;
  }

  try {
    console.log('[Albania Hub] Error logging initialized');
    console.log('[Albania Hub] Platform:', Platform.OS);

    // Store original console methods
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    // Override console.log
    console.log = (...args: any[]) => {
      originalConsoleLog.apply(console, args);
    };

    // Override console.warn
    console.warn = (...args: any[]) => {
      const message = stringifyArgs(args);
      if (!shouldMuteMessage(message)) {
        originalConsoleWarn.apply(console, args);
      }
    };

    // Override console.error
    console.error = (...args: any[]) => {
      const message = stringifyArgs(args);
      if (!shouldMuteMessage(message)) {
        originalConsoleError.apply(console, args);
      }
    };

    // Capture unhandled errors in web environment
    if (typeof window !== 'undefined' && Platform.OS === 'web') {
      window.onerror = (message, source, lineno, colno, error) => {
        const sourceFile = source ? source.split('/').pop() : 'unknown';
        const errorMessage = `RUNTIME ERROR: ${message} at ${sourceFile}:${lineno}:${colno}`;
        console.error(errorMessage);
        return false; // Don't prevent default error handling
      };

      // Capture unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        const message = `UNHANDLED PROMISE REJECTION: ${event.reason}`;
        console.error(message);
      });
    }
  } catch (error) {
    // If error logging setup fails, just log it and continue
    console.error('[Albania Hub] Error logging setup failed:', error);
  }
};

// Auto-initialize logging when this module is imported
if (__DEV__) {
  setupErrorLogging();
}

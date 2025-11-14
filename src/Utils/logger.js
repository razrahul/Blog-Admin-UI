// src/utils/logger.js
const raw = import.meta.env.VITE_ENABLE_LOGS;
const ENABLE_LOGS = String(raw ?? '').trim().toLowerCase() === 'true';

// small helper to see what we parsed (use only while debugging)
export const _debugParsedEnv = () => {
  // use console.error so this shows even if console.log is later overridden
  console.error('[logger] VITE_ENABLE_LOGS raw ->', raw, 'parsed ->', ENABLE_LOGS);
};

export const log = (...args) => {
  if (ENABLE_LOGS) console.log(...args);
};
export const info = (...args) => {
  if (ENABLE_LOGS) console.info(...args);
};
export const warn = (...args) => {
  if (ENABLE_LOGS) console.warn(...args);
};
export const error = (...args) => console.error(...args);

// safe global override: only override log/info if logs are explicitly disabled
export const applyGlobal = (override = true) => {
  if (!override) return;
  if (!ENABLE_LOGS) {
    // keep console.error so debug & runtime errors are visible
    console.log = () => {};
    console.info = () => {};
    // console.warn = () => {}; // optional: uncomment if you want to silence warnings too
  }
};

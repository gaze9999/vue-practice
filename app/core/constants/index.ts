/**
 * Application Constants
 * 審計系統應用常數
 */

// API Configuration
export const API = {
  BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 10 * 1000,
  RETRY_COUNT: 3,
};

// Application Settings
export const APP = {
  NAME: '作品展示集',
  VERSION: '1.0.0',
  LANGUAGE: 'zh-TW',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

// Audit Check Status
export const AUDIT_CHECK_STATUS = {
  PENDING: 'pending',
  EXECUTING: 'executing',
  COMPLETED: 'completed',
} as const;

// Audit Result Status
export const AUDIT_RESULT_STATUS = {
  PASS: 'pass',
  FAIL: 'fail',
  WARNING: 'warning',
  PENDING: 'pending',
} as const;

// Rule Priority
export const RULE_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  AUDITOR: 'auditor',
  CHECKER: 'checker',
  VIEWER: 'viewer',
} as const;

// Route Names
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  COUNTER: '/counter',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme_preference',
} as const;

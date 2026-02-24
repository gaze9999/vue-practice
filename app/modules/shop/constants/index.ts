/**
 * Shop 模組 - 日常管理常數
 */

// 財務狀態
export const FINANCE_STATUS = {
  DRAFT: 'draft',
  APPROVED: 'approved',
  POSTED: 'posted',
} as const;

// 庫存狀態
export const INVENTORY_STATUS = {
  NORMAL: 'normal',
  WARNING: 'warning',
  CRITICAL: 'critical',
} as const;

// 採購狀態
export const PROCUREMENT_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// 銷售狀態
export const SALES_STATUS = {
  DRAFT: 'draft',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
} as const;

// 招聘狀態
export const RECRUITMENT_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  CANCELLED: 'cancelled',
} as const;

// 考勤狀態
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LEAVE: 'leave',
} as const;

// 庫存調整類型
export const INVENTORY_ADJUSTMENT_TYPE = {
  ADD: 'add',
  REDUCE: 'reduce',
  ADJUST: 'adjust',
} as const;

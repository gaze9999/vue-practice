/**
 * Types and interfaces
 * 審計系統類型定義
 */

// API 回應
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 審計檢查
export interface AuditCheck {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'executing' | 'completed';
  result: 'pass' | 'fail' | 'warning' | 'pending';
  createdAt: string;
  lastExecuted: string;
  passCount: number;
  totalItems: number;
}

// 檢查規則
export interface AuditRule {
  id: string;
  name: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive';
  conditions: RuleCondition[];
}

// 規則條件
export interface RuleCondition {
  name: string;
  description: string;
  expression: string;
}

// 審計結果
export interface AuditResult {
  id: string;
  checkId: string;
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  executedAt: string;
  remarks: string;
}

// 系統使用者
export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'auditor' | 'checker' | 'viewer';
  status: 'active' | 'inactive';
}

// ERP 角色
export type ErpRole = 'admin' | 'manager' | 'finance' | 'hr' | 'sales' | 'viewer';

// ERP 使用者
export interface ErpUser {
  id: string;
  name: string;
  role: ErpRole;
  department: string;
}

// ERP 流程節點
export interface ErpWorkflowStep {
  id: string;
  title: string;
  ownerRole: ErpRole;
  status: 'done' | 'active' | 'pending';
  due: string;
  note: string;
}

// ERP 模組摘要
export interface ErpModuleSummary {
  id: string;
  name: string;
  owner: string;
  status: 'active' | 'pending' | 'blocked';
  updatedAt: string;
  kpi: string;
}

// ERP 指標
export interface ErpKpi {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
}

// ERP 通知
export interface ErpNotice {
  id: string;
  title: string;
  level: 'info' | 'warn' | 'critical';
  message: string;
  time: string;
}

/** 招募進度 */
export interface RecruitmentRow {
  role: string;
  stage: string;
  owner: string;
  sessions: string;
  status: 'active' | 'pending' | 'done';
}

/** 銷售管線 */
export interface PipelineRow {
  client: string;
  stage: string;
  amount: string;
  probability: string;
  status: 'active' | 'pending' | 'done';
}

/** 庫存調整單 */
export interface AdjustmentRow {
  id: string;
  item: string;
  diff: string;
  reason: string;
  status: 'active' | 'pending' | 'done';
}

/** 採購申請 */
export interface RequestRow {
  id: string;
  department: string;
  item: string;
  amount: string;
  status: 'active' | 'pending' | 'done';
}

/** 憑證與結帳 */
export interface VoucherRow {
  id: string;
  type: string;
  amount: string;
  period: string;
  status: 'active' | 'pending' | 'done';
}

/** 報表排程 */
export interface ScheduleRow {
  name: string;
  frequency: string;
  next: string;
  owner: string;
  status: 'active' | 'pending' | 'done';
}

import type { AdjustmentRow, PipelineRow, RecruitmentRow, RequestRow, ScheduleRow, VoucherRow } from '../types';

/** 人資 - 招募進度 */
export const recruitmentMockData: RecruitmentRow[] = [
  { role: '製程工程師', stage: '面談中', owner: '人資專員 A', sessions: '3 場', status: 'active' },
  { role: '採購專員', stage: '履歷篩選', owner: '人資專員 B', sessions: '1 場', status: 'pending' },
  { role: '財務助理', stage: '錄用核准', owner: '人資專員 A', sessions: '2 場', status: 'pending' },
];

/** 銷售 - 銷售管線 */
export const pipelineMockData: PipelineRow[] = [
  { client: '客戶 A', stage: '報價', amount: 'NT$ 1.6M', probability: '70%', status: 'active' },
  { client: '客戶 B', stage: '簽約', amount: 'NT$ 1.2M', probability: '85%', status: 'active' },
  { client: '客戶 C', stage: '洽談', amount: 'NT$ 820K', probability: '55%', status: 'pending' },
];

/** 庫存 - 庫存調整單 */
export const adjustmentsMockData: AdjustmentRow[] = [
  { id: 'ADJ-221', item: '原料 B', diff: '-180', reason: '盤點誤差', status: 'pending' },
  { id: 'ADJ-222', item: '包材 C', diff: '+120', reason: '收貨補登', status: 'done' },
  { id: 'ADJ-223', item: '零件 D', diff: '-20', reason: '報廢', status: 'active' },
];

/** 採購 - 採購申請清單 */
export const requestsMockData: RequestRow[] = [
  { id: 'REQ-901', department: '採購中心', item: '原料批次 A', amount: 'NT$ 320,000', status: 'active' },
  { id: 'REQ-902', department: '製造部', item: '包材補貨', amount: 'NT$ 85,000', status: 'pending' },
  { id: 'REQ-903', department: '設備部', item: '維修零件', amount: 'NT$ 52,000', status: 'pending' },
];

/** 財務 - 憑證與結帳明細 */
export const vouchersMockData: VoucherRow[] = [
  { id: 'V-901', type: '應收', amount: 'NT$ 210,000', period: '2026/02', status: 'active' },
  { id: 'V-902', type: '應付', amount: 'NT$ 320,000', period: '2026/02', status: 'pending' },
  { id: 'V-903', type: '稅務', amount: 'NT$ 58,000', period: '2026/02', status: 'pending' },
];

/** 報表 - 報表排程 */
export const scheduleMockData: ScheduleRow[] = [
  { name: '月營收報表', frequency: '每月 1 次', next: '03/01 08:00', owner: '分析小組', status: 'active' },
  { name: '庫存週轉率', frequency: '每週 1 次', next: '02/19 09:00', owner: '倉儲管理', status: 'active' },
  { name: '採購成本趨勢', frequency: '每月 2 次', next: '02/20 16:00', owner: '採購團隊', status: 'pending' },
]

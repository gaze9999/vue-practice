/**
 * Shop 模組類型定義
 */

// ============= 通用類型 =============
export interface ShopModuleBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// ============= 財務相關類型 =============
export interface FinanceListRequest {
  page: number;
  pageSize: number;
  filterBySalesType?: string;
  filterByDateRange?: [string, string];
}

export interface VoucherItem extends ShopModuleBase {
  voucherNo: string;
  voucherDate: string;
  amount: number;
  status: 'draft' | 'approved' | 'posted';
  creator: string;
}

export interface FinanceListResponse {
  items: VoucherItem[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface VoucherCreateRequest {
  voucherNo: string;
  voucherDate: string;
  items: VoucherDetailItem[];
  remark?: string;
}

export interface VoucherCreateResponse {
  id: string;
  voucherNo: string;
  message: string;
}

export interface VoucherDetailItem {
  sequence: number;
  account: string;
  department: string;
  debit: number;
  credit: number;
  description: string;
}

// ============= 庫存相關類型 =============
export interface InventoryItem extends ShopModuleBase {
  sku: string;
  name: string;
  quantity: number;
  safetyStock: number;
  reorderPoint: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface InventoryAdjustment extends ShopModuleBase {
  itemId: string;
  type: 'add' | 'reduce' | 'adjust';
  quantity: number;
  reason: string;
  approver: string;
}

// ============= 採購相關類型 =============
export interface ProcurementRequest extends ShopModuleBase {
  requestNo: string;
  items: ProcurementItem[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  requestor: string;
  approver?: string;
}

export interface ProcurementItem {
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// ============= 銷售相關類型 =============
export interface SalesOrder extends ShopModuleBase {
  orderNo: string;
  customer: string;
  items: SalesOrderItem[];
  totalAmount: number;
  status: 'draft' | 'confirmed' | 'shipped' | 'delivered';
  salesperson: string;
}

export interface SalesOrderItem {
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SalesPipeline extends ShopModuleBase {
  stageName: string;
  opportunity: string;
  customer: string;
  amount: number;
  probability: number;
  expectedCloseDate: string;
}

// ============= 人資相關類型 =============
export interface EmployeeRecruitment extends ShopModuleBase {
  position: string;
  department: string;
  headcount: number;
  applicants: number;
  status: 'open' | 'closed' | 'cancelled';
}

export interface EmployeeAttendance extends ShopModuleBase {
  employeeId: string;
  date: string;
  checkInTime: string;
  checkOutTime: string;
  status: 'present' | 'absent' | 'leave';
  remark?: string;
}

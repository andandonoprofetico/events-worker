export interface Session<T = any> {
  sessionId: number;
  phone: string; // varchar 20
  type: string; // varchar 10
  payload: T;
  companyId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string;
}

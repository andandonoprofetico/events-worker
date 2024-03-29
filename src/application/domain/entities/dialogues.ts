export interface Dialogue {
  dialoguesId: number;
  received?: string; // varchar 2000
  status: 'awaiting_response' | 'completed' | 'expired';
  stepId: number;
  sessionId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

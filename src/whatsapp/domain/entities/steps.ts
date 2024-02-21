export interface Step {
  stepId: number;
  step: string; // varchar 45
  error: string; // varchar 300
  action?: string; // varchar 45;
  redirect: 'multiple-response' | 'end' | string; // varchar 50;
  externalId: string; // varchar 36;
  companyId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

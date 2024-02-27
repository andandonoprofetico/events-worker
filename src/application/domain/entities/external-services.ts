export type ExternalServices<T = any> = {
  externalServiceId: number;
  name: string;
  data: T;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

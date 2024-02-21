import { Session, Step } from '@/whatsapp/domain/entities';

export interface SharedState {
  traceId?: string;
  session?: Session;
  steps?: {
    actual: Step | null;
    next: Step | null;
  };
}

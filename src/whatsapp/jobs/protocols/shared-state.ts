import { Message, Session, Step } from '@/application/domain';
import { ActionResult } from '@/whatsapp/domain/dto';

export interface SharedState {
  traceId?: string;
  session?: Session;
  steps?: {
    actual: Step | null;
    next: Step | null;
  };
  actions?: ActionResult;
  messages?: Message[];
}

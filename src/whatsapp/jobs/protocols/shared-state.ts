import { ActionResult } from '@/whatsapp/domain/dto';
import { Message, Session, Step } from '@/whatsapp/domain/entities';

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

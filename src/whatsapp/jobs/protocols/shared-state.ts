import { Session } from '@/whatsapp/domain/entities';

export interface SharedState {
  traceId?: string;
  session: Session;
}

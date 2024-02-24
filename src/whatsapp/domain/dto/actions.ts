import { Step, Session } from '../entities';
import { Payload } from './payload';

type ActionParams = {
  session: Session;
  payload: Payload;
  step: Step;
};

export type ActionResult = {
  type: 'text' | 'file' | 'button' | 'list'; // varchar 45
  header: string; // varchar 60
  body: string; // varchar 1024
  footer: string; // varchar 60
  button: string; // varchar 20
  additionalFields: { id: string; title: string; description?: string }[];
  fileUrl: string; // varchar 300
  fileMimeType: string; // varchar 45
  fileName: string; // varchar 45
}[];

export type Action = (params: ActionParams) => Promise<ActionResult>;

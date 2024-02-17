export interface Message {
  messageId: number;
  type: 'text' | 'file' | 'button' | 'list'; // varchar 45
  header: string; // varchar 60
  body: string; // varchar 1024
  footer: string; // varchar 60
  button: string; // varchar 20
  additionalFields: { id: string; title: string; description?: string }[];
  order: number;
  fileUrl: string; // varchar 300
  fileMimeType: string; // varchar 45
  fileName: string; // varchar 45
  stepId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

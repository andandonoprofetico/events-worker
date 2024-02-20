type Text = {
  type: 'text';
  text: string;
};

type File = {
  type: string;
  fileUrl: string;
  fileMimeType: string;
  fileName: string;
};

type Button = {};

export interface Payload {
  id: string;
  timestamp: string;
  type: string;
  subscriptionId: string;
  channel: 'whatsapp';
  direction: 'IN' | 'OUT';
  message: {
    id: string;
    from: string;
    to: string;
    direction: 'IN' | 'OUT';
    channel: 'whatsapp';
    visitor: {
      name: string;
      firstName: string;
      lastName: string;
    };
    contents: Array<Text | File | Button>;
    timestamp: string;
  };
}

type Text = {
  type: 'text';
  text: string;
};

type File = {
  type: 'file';
  fileUrl: string;
  fileMimeType: string;
  fileName: string;
};

type Button = {
  type: 'button';
  id: string;
};

type List = {
  type: 'list';
  id: string;
};

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
    contents: Array<Text | File | Button | List>;
    timestamp: string;
  };
}

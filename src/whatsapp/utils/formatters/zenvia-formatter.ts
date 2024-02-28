import { Session } from '@/application/domain';
import { ActionResult } from '@/whatsapp/domain/dto';

import { WHATSAPP } from '../constants';

type Params = {
  messages: ActionResult;
  session: Session;
};

const formatMap = (message: ActionResult[number]) => {
  if (message.type === 'text') {
    return {
      type: message.type,
      text: message.body,
    };
  }

  if (message.type === 'list') {
    return {
      type: message.type,
      header: message.header,
      body: message.body,
      footer: message.footer,
      button: message.button,
      sections: [
        {
          title: message.button,
          rows: message.additionalFields,
        },
      ],
    };
  }

  if (message.type === 'button') {
    return {
      type: message.type,
      header: message.header,
      body: message.body,
      footer: message.footer,
      buttons: message.additionalFields,
    };
  }

  return {
    type: 'file',
    fileUrl: message.fileUrl,
    fileMimeType: message.fileMimeType,
    fileCaption: message.fileName,
    fileName: message.fileName,
  };
};

export const whatsAppMessageFormatter = (params: Params) => {
  const { messages, session } = params;

  return {
    from: WHATSAPP.FROM,
    to: session.phone,
    contents: messages.map(formatMap),
  };
};

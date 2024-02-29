import { Session } from '@/application/domain';
import { ActionResult } from '@/whatsapp/domain/dto';

import { WHATSAPP } from '../constants';

type Params = {
  messages: ActionResult;
  session: Session;
};

const buildHeaderButton = (header?: string) => {
  if (!header) {
    return undefined;
  }

  const isUrl = header.startsWith('http');

  if (isUrl) {
    return {
      type: 'file',
      fileUrl: header,
    };
  }

  return {
    type: 'text',
    text: header,
  };
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
      header: buildHeaderButton(message.header),
      body: message.body,
      footer: message.footer || undefined,
      buttons: message.additionalFields,
    };
  }

  return {
    type: 'file',
    fileUrl: message.fileUrl,
    fileMimeType: message.fileMimeType || undefined,
    fileCaption: message.fileName || undefined,
    fileName: message.fileName || undefined,
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

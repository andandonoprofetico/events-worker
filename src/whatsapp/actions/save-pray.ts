import { Action } from '../domain/dto';
import { makeSendMessageAction } from '../factories/actions';

const savePray: Action = async (params) => {
  const message = params.payload.message.contents[0];
  const isText = message.type === 'text';

  if (!isText) {
    return [];
  }

  const { sendMessage, externalService } = makeSendMessageAction();

  const service = await externalService.listByNameAndCompany<{ token: string }>(
    {
      companyId: 1,
      name: 'andando-no-profetico',
    },
  );

  await sendMessage.post({
    type: 'PRAYERS',
    token: service.data.token,
    text: `${params.session.payload.user}\n\n${message.text}`,
  });

  return [];
};

export { savePray };

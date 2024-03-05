import { Action } from '../domain/dto';
import { makeSendMessageAction } from '../factories/actions';

const saveTestimonial: Action = async (params) => {
  const message = params.payload.message.contents[0];
  const isText = message.type === 'text';

  if (!isText) {
    return {
      actions: [],
      continue: false,
    };
  }

  const { sendMessage, externalService } = makeSendMessageAction();

  const service = await externalService.listByNameAndCompany<{ token: string }>(
    {
      companyId: 1,
      name: 'andando-no-profetico',
    },
  );

  const result = await sendMessage.post({
    type: 'TESTIMONIALS',
    token: service.data.token,
    text: `Usuário: ${params.session.payload.user}\n\n${message.text}`,
  });

  return {
    actions: [],
    continue: !!result,
  };
};

export { saveTestimonial };

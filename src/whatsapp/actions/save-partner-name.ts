import { Action } from '../domain/dto';
import { makeSendFormAction } from '../factories/actions';

const savePartnerName: Action = async (params) => {
  const message = params.payload.message.contents[0];
  const isText = message.type === 'text';

  if (!isText) {
    return {
      actions: [],
      continue: false,
    };
  }

  const formName = 'partner-name';

  const body = {
    name: message.text,
  };

  const { sendForm, externalService } = makeSendFormAction();

  const service = await externalService.listByNameAndCompany<{ token: string }>(
    {
      companyId: 1,
      name: 'andando-no-profetico',
    },
  );

  const result = await sendForm.post({
    form: formName,
    body,
    token: service.data.token,
  });

  return {
    actions: [],
    continue: !!result,
  };
};

export { savePartnerName };

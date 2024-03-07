import { Action } from '../domain/dto';
import { makeListEventByIdAction } from '../factories/actions';

const listEventById: Action = async (params) => {
  const message = params.payload.message.contents[0];
  const isText = message.type === 'text';

  if (!isText) {
    return {
      actions: [],
      continue: false,
    };
  }

  const { listEventById, externalService } = makeListEventByIdAction();

  const service = await externalService.listByNameAndCompany<{ token: string }>(
    {
      companyId: 1,
      name: 'andando-no-profetico',
    },
  );

  const event = await listEventById.list({
    token: service.data.token,
    id: message.payload || '',
  });

  if (!event) {
    return {
      actions: [],
      continue: false,
    };
  }

  return {
    actions: [
      {
        type: 'text',
        body: `*${event.course.name}*\n\n${event.course.description}\n\n📍 *Local*: ${event.course.local}\n📅 *Data*: ${event.course.date}\n\nAcesse o link: ${event.course.link}`,
      },
    ],
    continue: true,
  };
};

export { listEventById };

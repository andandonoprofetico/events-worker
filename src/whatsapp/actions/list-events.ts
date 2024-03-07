import { Action } from '../domain/dto';
import { makeListEventsAction } from '../factories/actions';

const listEvents: Action = async () => {
  const { listEvents, externalService } = makeListEventsAction();

  const service = await externalService.listByNameAndCompany<{ token: string }>(
    {
      companyId: 1,
      name: 'andando-no-profetico',
    },
  );

  const events = await listEvents.list({
    limit: 10,
    page: 0,
    token: service.data.token,
  });

  if (!events.length) {
    return {
      actions: [],
      continue: false,
    };
  }

  return {
    actions: [
      {
        type: 'list',
        header: 'Eventos 📌',
        body: 'Trouxemos os eventos disponíveis para você, selecione uma das opções caso deseje saber mais sobre ele.',
        footer: 'Selecione uma opção',
        button: 'Eventos',
        additionalFields: events.map((book, index) => ({
          id: book.course.external_id,
          title: `Evento ${index + 1}`,
          description: book.course.name.substring(0, 72),
        })),
      },
    ],
    continue: true,
  };
};

export { listEvents };

import { castToMoney } from '@/utils';

import { Action } from '../domain/dto';
import { makeListBookByIdAction } from '../factories/actions';

const listBookById: Action = async (params) => {
  const message = params.payload.message.contents[0];
  const isText = message.type === 'text';

  if (!isText) {
    return [];
  }

  const { listBookById, externalService } = makeListBookByIdAction();

  const service = await externalService.listByNameAndCompany<{ token: string }>(
    {
      companyId: 1,
      name: 'andando-no-profetico',
    },
  );

  const book = await listBookById.list({
    token: service.data.token,
    id: message.payload || '',
  });

  if (!book) {
    return [];
  }

  return [
    {
      type: 'text',
      body: `*${book.product.name}*\n\n${
        book.product.description
      }\n\n${castToMoney(+book.product.value)}\n\nPara comprar acesso o link: ${
        book.product.link
      }`,
    },
  ];
};

export { listBookById };

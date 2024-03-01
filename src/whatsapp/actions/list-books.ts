import { Action } from '../domain/dto';
import { makeListBooksAction } from '../factories/actions';

const listBooks: Action = async () => {
  const { listBooks, externalService } = makeListBooksAction();

  const service = await externalService.listByNameAndCompany<{ token: string }>(
    {
      companyId: 1,
      name: 'andando-no-profetico',
    },
  );

  const books = await listBooks.list({
    limit: 10,
    page: 0,
    token: service.data.token,
  });

  if (!books.length) {
    return [];
  }

  return [
    {
      type: 'list',
      header: 'Livros 📚',
      body: 'Trouxemos os melhores livros para você, selecione uma das opções caso deseje saber mais sobre ele.',
      footer: 'Selecione uma opção',
      button: 'Livros',
      additionalFields: books.map((book, index) => ({
        id: book.products.external_id,
        title: `Livro ${index + 1}`,
        description: book.products.name.substring(0, 72),
      })),
    },
  ];
};

export { listBooks };

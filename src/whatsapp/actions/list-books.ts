import { Action } from '../domain/dto';
import { makeListBooksAction } from '../factories/actions';

const listBooks: Action = async (params) => {
  const { listBooks, externalService } = makeListBooksAction();

  return [
    {
      type: 'list',
      header: 'Livros 📚',
      body: 'Trouxemos os melhores livros para você, selecione uma das opções caso deseje saber mais sobre ele.',
      footer: 'Selecione uma opção',
      button: 'Livros',
      additionalFields: [
        {
          id: 'c0140856-47ac-4aa3-8ccc-5677fd19f71a',
          title: 'Livro 1',
          description: 'TOP 50 SONHOS - E SEUS SIGNIFICADOS',
        },
      ],
    },
  ];
};

export { listBooks };

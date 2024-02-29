import { Action } from '../domain/dto';

const listBookById: Action = async (params) => {
  return [
    {
      type: 'text',
      body: '*TOP 50 SONHOS - E SEUS SIGNIFICADOS*\n\nOs sonhos falam muito sobre situações que estamos vivendo ou por que ainda passaremos, assim como podem representar coisas do passado que nos atormentam até hoje.\n\nR$ 45,00\n\nPara comprar acesso o link: https://www.profetaviniciusiracet.com.br/product-page/top-50-sonhos-e-seus-significados',
    },
  ];
};

export { listBookById };

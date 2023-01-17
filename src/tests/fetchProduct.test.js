import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar a função com o argumento do produto "MLB1405519561"', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar a função com o argumento do produto "MLB1405519561"', async () => {
    await fetchProduct('MLB1405519561');
    const endPoint = 'https://api.mercadolibre.com/items/MLB1405519561';
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  it('ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: ID não informado.', async () => {
    const errorMessage = 'ID não informado';
    await expect(fetchProduct()).rejects.toThrow(new Error(errorMessage));
  });
});

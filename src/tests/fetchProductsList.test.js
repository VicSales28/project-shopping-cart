import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  it('o retorno da função fetchProductsList é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    await fetchProductsList('computador');
    expect(typeof fetchProductsList('computador')).toEqual(typeof computadorSearch);
  });
  it('ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: Termo de busca não informado.', async () => {
    await fetchProductsList('computador');
    const errorMessage = 'Termo de busca não informado';
    expect(fetchProductsList()).toThrowError(errorMessage);
  });
});

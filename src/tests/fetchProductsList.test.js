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
    const fetchComputador = await fetchProductsList('computador');
    expect(fetchComputador).toEqual(computadorSearch);
  });

  it('ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: Termo de busca não informado.', async () => {
    const errorMessage = 'Termo de busca não informado';
    // Tentativa:
    // const fetchEmpty = await fetchProductsList();
    // expect(fetchEmpty).rejects.toThrow(new Error(errorMessage));
    await expect(fetchProductsList()).rejects.toThrow(new Error(errorMessage));
  });
});

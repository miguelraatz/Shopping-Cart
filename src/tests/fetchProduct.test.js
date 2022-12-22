import './mocks/fetchSimulator';
import { fetchProduct } from "../helpers/fetchFunctions";
import product from "./mocks/product";

// implemente seus testes aqui
describe("Teste a função fetchProduct", () => {
  it('testa se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('se ao executar fetchProduct com "MLB1405519561" fetch é chamado', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toBeCalled();
  });

  it('testa se ao executar fetchProduct fetch é chamado com o endpoint correto ', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('fetchProduct com o argumento "MLB1405519561" é uma estrutura de dados igual ao objeto produto', () => {
    return expect(fetchProduct('MLB1405519561')).resolves.toEqual(product);
  });

  it('fetchProduct sem argumento, retorna um erro', async () => {
    return expect(fetchProduct()).rejects.toHaveProperty('message', 'ID não informado');
  });
});

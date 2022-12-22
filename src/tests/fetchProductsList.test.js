import "./mocks/fetchSimulator";
import { fetchProductsList } from "../helpers/fetchFunctions";
import computadorSearch from "./mocks/search";

// implemente seus testes aqui
describe("Teste a função fetchProductsList", () => {
  it("fetchProductsList é uma função", () => {
    expect(typeof fetchProductsList).toBe("function");
  });
  it("fetch é chamado ao executar fetchProductsList", async () => {
    await fetchProductsList("computador");
    expect(fetch).toBeCalled();
  });
  it("fetch é chamado com o endpoint correto ao executar fetchProductsList", async () => {
    await fetchProductsList("computador");
    expect(fetch).toBeCalledWith(
      "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    );
  });
  it('fetchProductsList sem argumento, retorna um erro', async () => {
    return expect(fetchProductsList()).rejects.toHaveProperty('message', 'Termo de busca não informado');
  });
});

const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const URL_PRODUCT = 'https://api.mercadolibre.com/items/';

export const fetchProduct = (id) => new Promise((resolve, reject) => {
  if (id) {
    resolve(fetch(`${URL_PRODUCT}${id}`).then((response) => response.json()));
  }
  reject(new Error('ID não informado'));
});

export const fetchProductsList = (endpoint) => new Promise((resolve, reject) => {
  if (endpoint) {
    resolve(
      fetch(`${API_URL}${endpoint}`)
        .then((response) => response.json())
        .then((data) => data.results),
    );
  }
  reject(new Error('Termo de busca não informado'));
});

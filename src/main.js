import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

let productList;

const productsLoading = (classe, message) => {
  const createElementMessage = document.createElement('p');
  createElementMessage.innerText = message;
  createElementMessage.classList.add(classe);
  productList.appendChild(createElementMessage);
};

const addProductView = () => {
  productsLoading('loading', 'carregando...');
  fetchProductsList('computador')
    .then((list) => list.forEach(
      (product) => productList.appendChild(createProductElement(product)),
    )).catch(() => productsLoading(
      'error',
      'Algum erro ocorreu, recarregue a página e tente novamente',
    ))
    .finally(() => document.querySelector('.loading').remove());
};

const cart = document.querySelector('.cart__products');
const sectionProducts = document.querySelector('.products');

async function addToCart(idProduct) {
  const dataProduct = await fetchProduct(idProduct);
  const productToCart = createCartProductElement(dataProduct);
  return productToCart;
}

sectionProducts.addEventListener('click', async (event) => {
  if (event.target.className === 'product__add') {
    const targetElement = event.target;
    const idElement = targetElement.parentNode.firstChild.innerText;
    saveCartID(idElement);
    const getProductData = await addToCart(idElement);
    cart.appendChild(getProductData);
  }
});

const savedCartProducts = getSavedCartIDs();

Promise.all(savedCartProducts.map((idProduct) => addToCart(idProduct)))
  .then((values) => {
    values.forEach((element) => cart.appendChild(element));
  });

document.querySelector('.cep-button').addEventListener('click', searchCep);

window.onload = () => {
  productList = document.querySelector('.products');
  addProductView();
};

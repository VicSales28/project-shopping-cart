import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const computerOptions = await fetchProductsList('computador');

const productSection = document.querySelector('.products');

const showListOfProducts = (products) => {
  products.forEach((product) => {
    const htmlComponent = createProductElement(product);
    productSection.appendChild(htmlComponent);
  });
};

showListOfProducts(computerOptions);

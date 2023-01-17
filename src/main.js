import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

const noticeSection = document.querySelector('.notice');
const productSection = document.querySelector('.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

const runNotice = () => {
  const newElement = document.createElement('p');
  newElement.className = 'loading';
  newElement.innerText = 'carregando...';
  noticeSection.appendChild(newElement);
};

runNotice();

const computerOptions = await fetchProductsList('computador');

const showListOfProducts = (products) => {
  products.forEach((product) => {
    const htmlComponent = createProductElement(product);
    productSection.appendChild(htmlComponent);
  });
};

showListOfProducts(computerOptions);

const removeNotice = () => {
  const paragraph = document.querySelector('.loading');
  paragraph.innerText = '';
};

removeNotice();

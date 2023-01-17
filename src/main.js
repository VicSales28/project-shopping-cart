import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

const noticeSection = document.querySelector('.notice');
const productSection = document.querySelector('.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

const runLoadNotice = () => {
  const notification = document.createElement('p');
  notification.className = 'loading';
  notification.innerText = 'carregando...';
  noticeSection.appendChild(notification);
};

const showListOfProducts = (products) => {
  products.forEach((product) => {
    const htmlComponent = createProductElement(product);
    productSection.appendChild(htmlComponent);
  });
};

const removeLoadNotice = () => {
  const paragraph = document.querySelector('.loading');
  noticeSection.removeChild(paragraph);
};

const runErrorNotice = () => {
  const notification = document.createElement('p');
  notification.className = 'error';
  notification.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  noticeSection.appendChild(notification);
};

const requestingProductsList = async () => {
  try {
    runLoadNotice();
    const computerOptions = await fetchProductsList('computador');
    showListOfProducts(computerOptions);
    removeLoadNotice();
  } catch (error) {
    removeLoadNotice();
    runErrorNotice();
  }
};

requestingProductsList();

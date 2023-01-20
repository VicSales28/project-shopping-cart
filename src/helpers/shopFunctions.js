import { removeCartID, saveCartID, getSavedCartIDs,
  removeCartPrice, saveCartPrice, getSavedCartPrices } from './cartFunctions';
import { fetchProduct } from './fetchFunctions';

const cartProductsList = document.querySelector('ol.cart__products');
const totalPrice = document.querySelector('span.total-price');

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
export const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'product__image';
  img.src = imageSource.replace('I.jpg', 'O.jpg');
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
export const createCustomElement = (element, className, innerText = '') => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
export const getIdFromProduct = (product) => (
  product.querySelector('span.product__id').innerText
);

/*
Função responável por extrair apenas o preço do produto
a partir do retorno da API.
*/
export const getProductPrice = ({ price }) => price;

/**
 * Função que remove o produto do carrinho e calcula valor total do carrinho após remoção de item.
 * @param {Element} li - Elemento do produto a ser removido do carrinho.
 * @param {string} id - ID do produto a ser removido do carrinho.
 */
export const removeCartProduct = async (li, id) => {
  li.remove();
  removeCartID(id);

  const productData = await fetchProduct(id);
  removeCartPrice(getProductPrice(productData));
  const currentPrice = parseFloat(totalPrice.innerText);
  const newPrice = (currentPrice - parseFloat(getProductPrice(productData))).toFixed(2);
  totalPrice.innerText = newPrice;
};

/**
 * Função responsável por criar e retornar um product do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @param {string} product.pictures - Imagens do produto.
 * @returns {Element} Elemento de um product do carrinho.
 */
export const createCartProductElement = ({ id, title, price, pictures }) => {
  const li = document.createElement('li');
  li.className = 'cart__product';
  const imgContainer = createCustomElement('div', 'cart__product__image-container');

  const img = createProductImageElement(pictures[0].url);
  imgContainer.appendChild(img);

  const img2 = createProductImageElement((pictures[1] || pictures[0]).url);
  imgContainer.appendChild(img2);

  li.appendChild(imgContainer);

  const infoContainer = createCustomElement('div', 'cart__product__info-container');
  infoContainer.appendChild(createCustomElement('span', 'product__title', title));
  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  infoContainer.appendChild(priceElement);

  li.appendChild(infoContainer);

  const removeButton = createCustomElement(
    'i',
    'material-icons cart__product__remove',
    'delete',
  );
  li.appendChild(removeButton);

  li.addEventListener('click', () => removeCartProduct(li, id));
  return li;
};

/*
Função responsável por adicionar item ao carrinho,
salvar o id e o preço do item no Local Storage e
calcular valor total do carrinho após adição de item.
*/
export const addItemToCart = async (event) => {
  const productID = getIdFromProduct(event.target.closest('.product'));
  saveCartID(productID);
  const productData = await fetchProduct(productID);
  const itemCartFormat = createCartProductElement(productData);
  cartProductsList.appendChild(itemCartFormat);

  saveCartPrice(getProductPrice(productData));
  const currentPrice = parseFloat(totalPrice.innerText);
  const newPrice = (currentPrice + parseFloat(getProductPrice(productData))).toFixed(2);
  totalPrice.innerText = newPrice;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @param {number} product.price - Preço do produto.
 * @returns {Element} Elemento de produto.
 */
export const createProductElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'product';

  section.appendChild(createCustomElement('span', 'product__id', id));

  const thumbnailContainer = createCustomElement('div', 'img__container');
  thumbnailContainer.appendChild(createProductImageElement(thumbnail));
  section.appendChild(thumbnailContainer);

  section.appendChild(createCustomElement('span', 'product__title', title));

  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  section.appendChild(priceElement);

  const cartButton = createCustomElement(
    'button',
    'product__add',
    'Adicionar ao carrinho!',
  );
  section.appendChild(cartButton);
  // O evento de click foi inserido aqui pois a função createProductElement() é a responsável por criar o botão
  cartButton.addEventListener('click', addItemToCart);

  return section;
};

/*
Função responsável por realizar a consulta dos produtos salvos no Local Storage
e carregá-los no carrinho de compras.
*/
export const rescueCartItens = () => {
  const savedID = getSavedCartIDs();
  const result = savedID.map(async (productID) => {
    const productData = await fetchProduct(productID);
    const itemCartFormat = createCartProductElement(productData);
    cartProductsList.appendChild(itemCartFormat);
  });
  return result;
};

/*
Função responsável por realizar a consulta dos preços salvos no Local Storage,
somá-los e renderizar na tela como valor total do carrinho.
*/
export const rescueSumPrices = () => {
  const pricesLocal = [...getSavedCartPrices()];
  totalPrice.innerText = (pricesLocal.reduce((acc, curr) => acc + curr, 0)).toFixed(2);
};

/*
Função responsável por trazer dados salvos no Local Storage quando a página é reiniciada.
*/
window.onload = () => {
  rescueCartItens();
  rescueSumPrices();
};

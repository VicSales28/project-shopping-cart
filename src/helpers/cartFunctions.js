/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = [...getSavedCartIDs()];
  const indexProduct = cartProducts.indexOf(id);
  cartProducts.splice(indexProduct, 1);
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};

/**
 * Função que retorna todos os preços de produtos salvos no localStorage.
 * @returns {Array} - Preços de itens salvos do carrinho ou array vazio.
 */
export const getSavedCartPrices = () => {
  const pricesLocal = localStorage.getItem('prices');
  return pricesLocal ? JSON.parse(pricesLocal) : [];
};

/**
 * Função que salva preço de produto adicionado no Local Storage.
 * @param {string} price - Preço do produto a ser adicionado.
 */
export const saveCartPrice = (price) => {
  if (!price) throw new Error('Você deve fornecer o preço de um item');

  const pricesLocal = getSavedCartPrices();
  const newCartPrices = [...pricesLocal, price];
  localStorage.setItem('prices', JSON.stringify(newCartPrices));
};

/**
 * Função que remove preço de produto removido do Local Storage.
 * @param {string} price - Preço do produto a ser removido.
 */
export const removeCartPrice = (price) => {
  if (!price) throw new Error('Você deve fornecer o preço de um item');

  const pricesLocal = [...getSavedCartPrices()];
  const indexPrice = pricesLocal.indexOf(price);
  pricesLocal.splice(indexPrice, 1);
  localStorage.setItem('prices', JSON.stringify(pricesLocal));
};

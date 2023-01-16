export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (query) => {
  // seu código aqui:
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  if (!query) {
    throw new Error('Termo de busca não informado');
  } else {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.results;
  }
};

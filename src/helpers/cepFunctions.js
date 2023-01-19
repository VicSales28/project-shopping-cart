// const cepInput = document.querySelector('cep-input');
// const buttomCep = document.querySelector('cep-button cart-button');
// const cartAdress = document.querySelector('cart__address');

export const request1stAPI = async (cep) => {
  // seu código aqui:
  const endpoint = `https://cep.awesomeapi.com.br/json/${cep}`;
  if (!cep) {
    throw new Error('Cep não informado');
  } else {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  }
};

export const request2stAPI = async (cep) => {
  // seu código aqui:
  const endpoint = `https://brasilapi.com.br/api/cep/v2/${cep}`;
  if (!cep) {
    throw new Error('Cep não informado');
  } else {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  }
};

export const getAddress = async (cep) => {
  // seu código aqui
  const data = await Promise.any([
    request1stAPI(cep),
    request2stAPI(cep),
  ]);
  return data;
};

export const searchCep = () => {
  // seu código aqui
};

const cepInput = document.querySelector('.cep-input');
const cartAdress = document.querySelector('.cart__address');

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

export const searchCep = async () => {
  // seu código aqui
  try {
    const data = await getAddress(cepInput.value);

    if (data.code === 'invalid'
      || data.code === 'not_found'
      || data.type === 'service_error') {
      throw new Error('Serviços de CEP retornaram erro.');
    } else {
      const street = `${data.address || data.street}`;
      const district = `${data.district || data.neighborhhod}`;
      const city = `${data.city}`;
      const state = `${data.state}`;

      cartAdress.innerText = `${street} - ${district} - ${city} - ${state}`;
    }
  } catch (error) {
    cartAdress.innerHTML = 'CEP não encontrado';
    console.log(error.message);
  }
};

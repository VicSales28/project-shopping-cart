const cepInput = document.querySelector('.cep-input');
const cartAdress = document.querySelector('.cart__address');

/*
Esta função faz uma requisição para a primeira API de CEPs que será utilizada.
 */
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

/*
Esta função faz uma requisição para a segunda API de CEPs que será utilizada.
 */
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

/*
Esta função fará a requisição para 2 APIs de CEP diferentes e utiliza a que retornar primeiro.
 */
export const getAddress = async (cep) => {
  // seu código aqui
  const data = await Promise.any([
    request1stAPI(cep),
    request2stAPI(cep),
  ]);
  return data;
};

/*
Esta função chama a getAddress com o CEP digitado no input e exibe o endereço completo na tela.
Obs.: Caso ambas as APIs retornem erro, a função exibe o texto CEP não encontrado.
 */
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

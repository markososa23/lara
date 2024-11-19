const ENDPOINT = 'https://reqres.in/api/login';
//SITIO WEB DE LA API https://reqres.in/
//Recibe por parametro un objeto con el username y nuestro password
export default function login({ username, password }) {
  return fetch(`${ENDPOINT}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //Estos headers son necesarios para la llamda dada la construcción de nuestra fake api
      //no siempre nuestras llamadas van a necesitar este código
      Cookie: '__cfduid=d62490b161e2db30c916b0e697da3cd851615242775',
    },
    //Mandamos nuestro objeto con nuestros datos
    body: JSON.stringify({ email: username, password: password }),
    redirect: 'follow',
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error en la petición');
      return res.json();
    })
    .then((response) => {
      //Recibimos un JWT
      const { token } = response;
      return token;
    });
}
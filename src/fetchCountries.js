function fetchCountryByName(searchValue) {
  const url = `https://restcountries.com/v3.1/name/${searchValue}?fields=name,languages,capital,population,flags,ccn3`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

function fetchCountryByCode(cantryCode) {
  const url = `https://restcountries.com/v3.1/alpha/${cantryCode}?fields=name,languages,capital,population,flags,ccn3`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

export { fetchCountryByName, fetchCountryByCode };

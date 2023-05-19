function fetchCountries(searchValue) {
  const url = `https://restcountries.com/v3.1/name/${searchValue}?fields=name,languages,capital,population,flags`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
export {fetchCountries}
function createCountryListItemMarkup(countries) {
  return countries
    .map(
      country => `<li class='wrap pointer'>
      <img src='${country.flags.svg}' width='30' height='20' />
      <p data-code='${country.ccn3}'>${country.name.official}</p>
  </li>
`
    )
    .join('');
}

function createOneCountryTitleMarkup(country) {
  return `<li class='wrap'>
        <img src ='${country.flags.svg}' width='30' height='20' />
        <h2>${country.name.official}</h2>
      </li>`;
}

function createOneCountryInfoMarkup(country) {
  const languagesAsString = Object.values(country.languages).join(', ');
  return `
      <p><b>Capital:</b> ${country.capital}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Languages:</b> ${languagesAsString}</p>`;
}

export {
  createOneCountryTitleMarkup,
  createOneCountryInfoMarkup,
  createCountryListItemMarkup,
};

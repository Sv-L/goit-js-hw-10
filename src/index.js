import './css/styles.css';
import {fetchCountries} from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import _ from 'lodash';

Notify.init({
  position: 'center-top',
});

const DEBOUNCE_DELAY = 300;
const searchBoxEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchBoxEl.addEventListener('input', _.debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const search = e.target.value.trim();
  
  if (search === '') {
    clearMarkup(); 
    return
  }
  
  fetchCountries(search)
  .then(renderCountryList)
  .catch(handleError);
}

function renderCountryList(countries) {
  const numberOfCountries = countries.length;

  if (numberOfCountries > 10) {
    clearMarkup()
    Notify.info('Too many matches found. Please enter a more specific name.');
    return
  }
  if (numberOfCountries === 1) {
    createOneCountryMarkup(countries);
  } else {
    clearMarkup();
    createCountryListItemMarkup(countries);  
  }
}

function clearMarkup () {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

function handleError(error) {
  console.log(error);
  clearMarkup();
  Notify.failure('Oops, there is no country with that name.');
}

function createOneCountryMarkup(countriesArray) {
  const country = countriesArray[0];
  const markupTitle = `<div class='wrap'>
        <img src ='${country.flags.svg}' width='30' height='20' />
        <h2>${country.name.official}</h2>
      </div>`;
    
  const languagesAsString = Object.values(country.languages).join(', ');
  const markupInfo = `
      <p><b>Capital:</b> ${country.capital}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Languages:</b> ${languagesAsString}</p>`;
    
  countryListEl.innerHTML = markupTitle;
  countryInfoEl.innerHTML = markupInfo;
}

function createCountryListItemMarkup(countries) {
  const countriesListMarkup = countries
      .map(country =>  `<li>
    <div class='wrap'>
      <img src='${country.flags.svg}' width='30' height='20' />
      <p data-code='${country.ccn3}'>${country.name.official}</p>
    </div>
  </li>
`).join('');
 countryListEl.innerHTML = countriesListMarkup;
} 
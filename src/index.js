import './css/styles.css';
import { fetchCountryByName, fetchCountryByCode } from './fetchCountries';
import {
  createOneCountryTitleMarkup,
  createOneCountryInfoMarkup,
  createCountryListItemMarkup,
} from './marcup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import _ from 'lodash';

Notify.init({
  position: 'center-top',
});

const DEBOUNCE_DELAY = 300;
const searchBoxEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchBoxEl.addEventListener(
  'input',
  _.debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(e) {
  const search = e.target.value.trim();

  if (search === '') {
    clearMarkup();
    return;
  }
  fetchCountryByName(search).then(renderCountryList).catch(handleError);
}

function renderCountryList(countries) {
  const numberOfCountries = countries.length;

  if (numberOfCountries > 10) {
    clearMarkup();
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (numberOfCountries === 1) {
    const country = countries[0];
    createOneCountryMarkup(country);
  } else {
    clearMarkup();
    countryListEl.innerHTML = createCountryListItemMarkup(countries);
    countryListEl.addEventListener('click', onClickCountriesName);
  }
}

function clearMarkup() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}

function handleError(error) {
  console.log(error);
  clearMarkup();
  Notify.failure('Oops, there is no country with that name.');
}

function createOneCountryMarkup(country) {
  countryListEl.innerHTML = createOneCountryTitleMarkup(country);
  countryInfoEl.innerHTML = createOneCountryInfoMarkup(country);
}

function onClickCountriesName(e) {
  const liElement = e.target.closest('li');
  if (!liElement) return;
  const code = liElement.querySelector('p').dataset.code;
  searchBoxEl.value = liElement.querySelector('p').textContent.trim();
  fetchCountryByCode(code).then(createOneCountryMarkup).catch(handleError);
  countryListEl.removeEventListener('click', onClickCountriesName);
}

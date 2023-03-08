import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
// include 96x96 icon for brandimg on righthandside of navbar
import BrandImg from '../images/icon_96x96.png';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
    main.appendChild(spinner);
};

// Insert logo
const navbarBrand = document.querySelector('.navbar-brand__img');
navbarBrand.src = BrandImg;

const editor = new Editor();

if (typeof editor === 'undefined') {
    loadSpinner();
}

// Check whether service workers are supported or not
if ('serviceWorker' in navigator) {
    // register workbox service worker
    const workboxSW = new Workbox('/src-sw.js');
    workboxSW.register();
} else {
    console.error('Service workers are not supported in this browser.');
}

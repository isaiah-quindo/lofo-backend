/* eslint-disable */

import '@babel/polyfill';
import { login, logout, signup } from './login';
import { updateSettings } from './updateSettings';
import { report, deleteItem } from './report';
import { filter } from './filter';
// import { bookTour } from './stripe';
// import { showAlert } from './alerts';

// DOM Elemets
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.logout-btn');
const signupForm = document.querySelector('.form--signup');
const userDataForm = document.querySelector('.form--update-setting');
const userPasswordForm = document.querySelector('.form--user-password');
const reportForm = document.querySelector('.form--report-item');
const filterForm = document.querySelector('.form--filter');
const deleteItemBtn = document.querySelector('#deleteItem');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.signup-btn').textContent = 'SIGNING UP...';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (reportForm)
  reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('itemName').value);
    form.append('category', document.getElementById('category').value);
    form.append('location', document.getElementById('locationExact').value);
    form.append('city', document.getElementById('locationCityInput').value);
    form.append(
      'province',
      document.getElementById('locationProvinceInput').value
    );
    form.append('date', document.getElementById('date').value);
    form.append('reward', document.getElementById('reward').value);
    form.append('description', document.getElementById('description').value);
    form.append('contactType', document.getElementById('contactType').value);
    form.append('contact', document.getElementById('contact').value);
    form.append('user', document.getElementById('user').value);
    form.append('itemType', document.getElementById('itemType').value);

    const images3 = document.getElementById('images3').files[0];
    const images2 = document.getElementById('images2').files[0];
    const images1 = document.getElementById('images1').files[0];

    form.append('images', images3);
    form.append('images', images2);
    form.append('images', images1);

    report(form);
  });

if (deleteItemBtn)
  deleteItemBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const item = document.getElementById('deleteItem');
    const itemId = item.getAttribute('data-item-id');

    console.log(itemId);

    deleteItem(itemId);
  });

if (filterForm)
  filterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const city = document.getElementById('locationCityInput').value;
    const province = document.getElementById('locationProvinceInput').value;
    const itemType = document.getElementById('itemType').value;

    filter(category, city, province, itemType);
  });

// if (bookBtn)
//   bookBtn.addEventListener('click', (e) => {
//     e.target.textContent = 'Processing...';
//     const { tourId } = e.target.dataset;
//     bookTour(tourId);
//   });

// const alertMessage = document.querySelector('.found-items').dataset.alert;
// if (alertMessage) showAlert('success', alertMessage, 10);

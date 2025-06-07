require("@babel/polyfill");
var $9xd1Z$axios = require("axios");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/* eslint-disable */ 
/* eslint-disable */ 
/* eslint-disable */ const $3be83c30fffee8b8$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
const $3be83c30fffee8b8$export$de026b00723010c1 = (type, msg, time = 7)=>{
    $3be83c30fffee8b8$export$516836c6a9dfc573();
    const markup = `<div class="alert alert-${type} system-alert" role="alert">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout($3be83c30fffee8b8$export$516836c6a9dfc573, time * 1000);
};


const $4cb8323bf951a0c8$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await (0, ($parcel$interopDefault($9xd1Z$axios)))({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === 'success') {
            (0, $3be83c30fffee8b8$export$de026b00723010c1)('success', 'Logged in successfully');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        (0, $3be83c30fffee8b8$export$de026b00723010c1)('danger', err.response.data.message);
    }
};
const $4cb8323bf951a0c8$export$7200a869094fec36 = async (name, email, password, passwordConfirm)=>{
    try {
        const res = await (0, ($parcel$interopDefault($9xd1Z$axios)))({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            }
        });
        if (res.data.status === 'success') {
            (0, $3be83c30fffee8b8$export$de026b00723010c1)('success', 'Signed up successfully');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        (0, $3be83c30fffee8b8$export$de026b00723010c1)('danger', err.response.data.message);
    }
};
const $4cb8323bf951a0c8$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await (0, ($parcel$interopDefault($9xd1Z$axios)))({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        res.data.status = 'success';
        window.setTimeout(()=>{
            location.assign('/');
        }, 1500);
    } catch (err) {
        console.log(err.response);
        (0, $3be83c30fffee8b8$export$de026b00723010c1)('danger', 'Error logging out! Try again.');
    }
};


/* eslint-disable */ 

const $e6bcf1c086fc55e5$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe';
        const res = await (0, ($parcel$interopDefault($9xd1Z$axios)))({
            method: 'PATCH',
            url: url,
            data: data
        });
        if (res.data.status === 'success') (0, $3be83c30fffee8b8$export$de026b00723010c1)('success', `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
    } catch (err) {
        (0, $3be83c30fffee8b8$export$de026b00723010c1)('error', err.response.data.message);
    }
};


/* eslint-disable */ 

const $30602a2b0140eb6a$export$f18d5b0af29128b7 = async (data)=>{
    try {
        const res = await (0, ($parcel$interopDefault($9xd1Z$axios)))({
            method: 'POST',
            url: '/api/v1/items',
            withCredentials: true,
            data: data
        });
        if (res.data.status === 'success') {
            (0, $3be83c30fffee8b8$export$de026b00723010c1)('success', 'Item posted successfully');
            window.setTimeout(()=>{
                location.assign(`/my-items`);
            }, 1500);
        }
    } catch (err) {
        (0, $3be83c30fffee8b8$export$de026b00723010c1)('danger', err.response.data.message);
    }
};
const $30602a2b0140eb6a$export$8d8542dbbc23fe1a = async (data)=>{
    (0, ($parcel$interopDefault($9xd1Z$axios))).delete(`/api/v1/items/${data}`, {
        withCredentials: true
    }).then(()=>{
        (0, $3be83c30fffee8b8$export$de026b00723010c1)('success', 'Item deleted');
        window.setTimeout(()=>{
            location.assign(`/my-items`);
        }, 1500);
    }).catch((err)=>{
        console.log(err.response);
        (0, $3be83c30fffee8b8$export$de026b00723010c1)('danger', 'Error in deleting na item! Please try again.');
    });
};


/* eslint-disable */ 

const $ad7fc76be03d3884$export$3dea766d36a8935f = async (category, city, province, itemType)=>{
    try {
        const res = await (0, ($parcel$interopDefault($9xd1Z$axios)))({
            method: 'GET',
            url: `/api/v1/items?category=${category}&city=${city}&province=${province}`
        });
        if (res.data.status === 'success') //showAlert('success', 'Filter posted successfully');
        window.setTimeout(()=>{
            location.assign(`/view/${itemType}/search?category=${category}&city=${city}&province=${province}`);
        }, 1500);
    } catch (err) {
        (0, $3be83c30fffee8b8$export$de026b00723010c1)('danger', err.response.data.message);
    }
};


// import { bookTour } from './stripe';
// import { showAlert } from './alerts';
// DOM Elemets
const $e81e26be84011757$var$loginForm = document.querySelector('.form--login');
const $e81e26be84011757$var$logOutBtn = document.querySelector('.logout-btn');
const $e81e26be84011757$var$signupForm = document.querySelector('.form--signup');
const $e81e26be84011757$var$userDataForm = document.querySelector('.form--update-setting');
const $e81e26be84011757$var$userPasswordForm = document.querySelector('.form--user-password');
const $e81e26be84011757$var$reportForm = document.querySelector('.form--report-item');
const $e81e26be84011757$var$filterForm = document.querySelector('.form--filter');
const $e81e26be84011757$var$deleteItemBtn = document.querySelector('#deleteItem');
if ($e81e26be84011757$var$loginForm) $e81e26be84011757$var$loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    (0, $4cb8323bf951a0c8$export$596d806903d1f59e)(email, password);
});
if ($e81e26be84011757$var$logOutBtn) $e81e26be84011757$var$logOutBtn.addEventListener('click', (0, $4cb8323bf951a0c8$export$a0973bcfe11b05c9));
if ($e81e26be84011757$var$signupForm) $e81e26be84011757$var$signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    document.querySelector('.signup-btn').textContent = 'SIGNING UP...';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    (0, $4cb8323bf951a0c8$export$7200a869094fec36)(name, email, password, passwordConfirm);
});
if ($e81e26be84011757$var$userDataForm) $e81e26be84011757$var$userDataForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    (0, $e6bcf1c086fc55e5$export$f558026a994b6051)(form, 'data');
});
if ($e81e26be84011757$var$userPasswordForm) $e81e26be84011757$var$userPasswordForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await (0, $e6bcf1c086fc55e5$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});
if ($e81e26be84011757$var$reportForm) $e81e26be84011757$var$reportForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('itemName').value);
    form.append('category', document.getElementById('category').value);
    form.append('location', document.getElementById('locationExact').value);
    form.append('city', document.getElementById('locationCityInput').value);
    form.append('province', document.getElementById('locationProvinceInput').value);
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
    (0, $30602a2b0140eb6a$export$f18d5b0af29128b7)(form);
});
if ($e81e26be84011757$var$deleteItemBtn) $e81e26be84011757$var$deleteItemBtn.addEventListener('click', async (e)=>{
    e.preventDefault();
    const item = document.getElementById('deleteItem');
    const itemId = item.getAttribute('data-item-id');
    console.log(itemId);
    (0, $30602a2b0140eb6a$export$8d8542dbbc23fe1a)(itemId);
});
if ($e81e26be84011757$var$filterForm) $e81e26be84011757$var$filterForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const category = document.getElementById('category').value;
    const city = document.getElementById('locationCityInput').value;
    const province = document.getElementById('locationProvinceInput').value;
    const itemType = document.getElementById('itemType').value;
    (0, $ad7fc76be03d3884$export$3dea766d36a8935f)(category, city, province, itemType);
}); // if (bookBtn)
 //   bookBtn.addEventListener('click', (e) => {
 //     e.target.textContent = 'Processing...';
 //     const { tourId } = e.target.dataset;
 //     bookTour(tourId);
 //   });
 // const alertMessage = document.querySelector('.found-items').dataset.alert;
 // if (alertMessage) showAlert('success', alertMessage, 10);


//# sourceMappingURL=app.js.map

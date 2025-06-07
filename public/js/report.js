/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const report = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/items',
      withCredentials: true,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Item posted successfully');
      window.setTimeout(() => {
        location.assign(`/my-items`);
      }, 1500);
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};

export const deleteItem = async (data) => {
  axios
    .delete(`/api/v1/items/${data}`, { withCredentials: true })
    .then(() => {
      showAlert('success', 'Item deleted');
      window.setTimeout(() => {
        location.assign(`/my-items`);
      }, 1500);
    })
    .catch((err) => {
      console.log(err.response);
      showAlert('danger', 'Error in deleting na item! Please try again.');
    });
};

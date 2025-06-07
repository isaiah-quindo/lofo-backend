/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const filter = async (category, city, province, itemType) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/items?category=${category}&city=${city}&province=${province}`,
    });

    if (res.data.status === 'success') {
      //showAlert('success', 'Filter posted successfully');
      window.setTimeout(() => {
        location.assign(
          `/view/${itemType}/search?category=${category}&city=${city}&province=${province}`
        );
      }, 1500);
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};

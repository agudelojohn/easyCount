/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const addRecipe = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/recipe',
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Created successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert(err);
    console.log(err);
    // if (err.response.data.message.includes('duplicate key error')) {
    //   showAlert('error', 'Recipe name is already existing');
    // } else {
    //   showAlert('error', err.response.data.message);
    // }
  }
};

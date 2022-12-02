/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const addRecipe = async (
  name,
  description,
  steps,
  link,
  ingredients
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://192.168.1.9:3000/api/v1/recipe',
      data: {
        name,
        description,
        steps,
        link,
        ingredients,
        image: '/img/favicon.png',
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Created successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    if (err.response.data.message.includes('duplicate key error')) {
      showAlert('error', 'Recipe name is already existing');
    }
  }
};

/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const addIngredient = async (
  name,
  calories,
  measure,
  soldIndividualy
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/ingredient',
      data: {
        name,
        calories,
        measure,
        soldIndividualy,
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

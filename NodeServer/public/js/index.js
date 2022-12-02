import '@babel/polyfill';
import { addIngredient } from './ingredientsCRU';

// DOM ELEMENTS
const ingredientForm = document.querySelector('.form-ingredient-data');

if (ingredientForm) {
  ingredientForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const calories = parseInt(document.getElementById('calories').value);
    const measure = document.getElementById('measure').value.toUpperCase();
    const soldIndividualy =
      document.getElementById('soldIndividualy').value == 'true' ? true : false;
    addIngredient(name, calories, measure, soldIndividualy);
  });
}

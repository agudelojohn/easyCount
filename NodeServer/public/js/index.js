import '@babel/polyfill';
import { addIngredient } from './ingredientsCRU';
import { addRecipe } from './recipesCRU';

// DOM ELEMENTS
const ingredientForm = document.querySelector('.form-ingredient-data');
const recipeForm = document.querySelector('.form-recipe-data');

const addMultipleBtn = document.querySelector('#more__ingredients');

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

if (addMultipleBtn) {
  addMultipleBtn.addEventListener('click', (event) => {
    let elem = document.querySelector('#table__ingredient');
    let markup = elem.cloneNode(true);
    markup.style = 'margin-top:1rem';
    markup.value = 0;
    const btn = document.querySelector('.one__more__btn');
    btn.before(markup);
  });
}

if (recipeForm) {
  recipeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const ingredients = [];
    const amounts = document.querySelectorAll('#amount');
    document
      .querySelectorAll('#ingredient')
      .forEach((el, i) =>
        ingredients.push({ amount: amounts[i].value, data: el.value })
      );
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const steps = document.getElementById('steps').value;
    const link = document.getElementById('link').value;

    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('steps', steps);
    form.append('link', link);
    ingredients.forEach((elem, i) => {
      form.append(`ingredients[${i}][amount]`, elem.amount);
      form.append(`ingredients[${i}][data]`, elem.data);
    });
    form.append('image', document.getElementById('image').files[0]);
    addRecipe(form);
  });
}

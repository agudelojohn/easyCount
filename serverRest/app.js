const express = require("express");
const mysql = require("mysql");

const bodyParser = require("body-parser");
const { throws } = require("assert");

const PORT = process.env.PORT || 3050;

const app = express();

const idTemp = 99;

app.use(bodyParser.json());

// MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Warcraft123",
  database: "easycount_schema",
});

//Dummy Route
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

//Get all recipes
app.get("/recipes", (req, res) => {
  const sqlRecipes = "SELECT*FROM recipe";
  connection.query(sqlRecipes, (err, recipesResuls) => {
    if (err) throw err;
    // res.json(recipesResuls);

    const sqlIngredients = "SELECT*FROM ingredient";
    connection.query(sqlIngredients, (err2, ingredientsResuls) => {
      if (err2) throw err2;
      //   res.json(ingredientsResuls);

      const sqlAmounts = "SELECT*FROM amount";
      connection.query(sqlAmounts, (err3, amountsResuls) => {
        if (err3) throw err3;
        // res.json(amountsResuls);

        //Assemble results
        recipesResuls.forEach(recipe=>{
            const idRecipe = recipe.idRecipe;
            let amountsPerRecipe = amountsResuls.filter(amount => amount.idRecipe === idRecipe);
            amountsPerRecipe.forEach(amount => {
                let ingredient = ingredientsResuls.find(ingredient => ingredient.idIngredient === amount.idIngredient);
                ingredient['amount']=amount.amount;
                if(!recipe["ingredients"]){
                    recipe["ingredients"] = [ingredient];
                }else{
                    recipe["ingredients"].push(ingredient);
                }
            });
        });
        res.json(recipesResuls);
      });
    });
  });
});

//Get recipe by id
app.get("/recipes/:idRecipe", (req, res) => {
  const { idRecipe } = req.params;
  const sql = `SELECT*FROM recipe AS r INNER JOIN amount AS a ON r.idRecipe = a.idRecipe INNER JOIN ingredient AS i ON a.idIngredient = i.idIngredient WHERE r.idRecipe=${idRecipe};`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("No result found");
    }
  });
});

//Add recipe
app.post("/recipes/add", (req, res) => {
  const sql_recipe = `INSERT INTO recipe SET ?`;
  const sql_ingredient = `INSERT INTO ingredient SET ?`;
  const sql_amont = `INSERT INTO amount SET ?`;

  //Insert recipe
  const recipeObject = {
    nameRecipe: req.body.nameRecipe,
    description: req.body.description,
    link: req.body.link,
    isSaved: req.body.isSaved,
  };
  connection.query(sql_recipe, recipeObject, function (error, results, fields) {
    if (error) throw error;
    let idRecipeInserted = results.insertId;
    //Insert ingredients
    req.body.ingredients.map((ingredient) => {
      const ingredientObject = {
        nameIngredient: ingredient.nameIngredient,
        calories: ingredient.calories,
        soldIndividualy: ingredient.soldIndividualy,
        measure: ingredient.measure,
      };
      connection.query(
        sql_ingredient,
        ingredientObject,
        function (error2, results2, fields) {
          if (error2) throw error2;
          let idIngredientInserted = results2.insertId;
          let amountObject = {
            idRecipe: idRecipeInserted,
            idIngredient: idIngredientInserted,
            amount: ingredient.amount,
          };
          connection.query(
            sql_amont,
            amountObject,
            function (error3, results3, fields) {
              if (error3) throw error3;
            }
          );
        }
      );
    });
  });
  res.send("Recipe saved");
});

//Update Recipe
app.put("/recipes/update/:idRecipe", (req, res) => {
  const { idRecipe } = req.params;
  const { nameRecipe, description, link, isSaved } = req.body;
  const sql = `UPDATE recipe SET nameRecipe='${nameRecipe}', description='${description}', link='${link}', isSaved=${isSaved} 
    WHERE idRecipe=${idRecipe};`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(`Recipe ${nameRecipe} updated`);
  });
});

//Update Ingredient
app.put("/ingredients/update/:idIngredient", (req, res) => {
  const { idIngredient } = req.params;
  const { nameIngredient, calories, soldIndividualy, measure } = req.body;
  const sql = `UPDATE ingredient SET nameIngredient='${nameIngredient}', calories=${calories}, soldIndividualy=${soldIndividualy}, measure='${measure}' 
      WHERE idIngredient=${idIngredient};`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(`Ingredient ${nameIngredient} updated`);
  });
});

//Update Amount
app.put("/amount/update/:idRecipe/:idIngredient", (req, res) => {
  const { idRecipe, idIngredient } = req.params;
  const { amount } = req.body;
  const sql = `UPDATE amount SET amount='${amount}' WHERE idIngredient=${idIngredient} and idRecipe=${idRecipe};`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(`Amount updated`);
  });
});

//Delete Recipe
app.delete("/recipes/delete/:idRecipe", (req, res) => {
  const { idRecipe } = req.params;
  const sql = `UPDATE recipe SET isSaved=false WHERE idRecipe=${idRecipe};`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(`Recipe deleted`);
  });
});

//TODO: Add delete to INGREDIENTS, but just diminish amount

// connection check
connection.connect((error) => {
  if (error) throw error;
  console.log("Database server running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

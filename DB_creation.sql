create table ingredient(
	idIngredient int NOT NULL AUTO_INCREMENT,
    nameIngredient varchar(100),
    calories int not null,
    soldIndividualy boolean not null,
    measure varchar(5),
    primary key (idIngredient)
);


create table recipe(
	idRecipe int NOT NULL AUTO_INCREMENT,
    nameRecipe varchar(100) not null,
    description varchar(1000) not null, 
    link varchar(150),
    isSaved boolean,
    primary key(idRecipe)
);


create table amount(
	idRecipe int NOT NULL,
    idIngredient int NOT NULL,
    amount int NOT NULL,
    primary key(idRecipe,idIngredient),
    foreign key(idRecipe) references recipe(idRecipe),
    foreign key(idIngredient) references ingredient(idIngredient)
);

insert into ingredient(calories,soldIndividualy,measure,nameIngredient ) values(1, true, 'gr', 'ingredient-1');
insert into ingredient(calories,soldIndividualy,measure,nameIngredient ) values(2, true, 'kl', 'ingredient-2');
insert into ingredient(calories,soldIndividualy,measure,nameIngredient ) values(3, true, 'ml', 'ingredient-3');

insert into recipe(nameRecipe, description, link, isSaved) values('name of recipe 1', 'steeeps','https://.........',true);
insert into recipe(nameRecipe, description, link, isSaved) values('name of recipe 2', 'steeeps','https2://.........',true);
insert into recipe(nameRecipe, description, link, isSaved) values('name of recipe 3', 'steeeps','https3://.........',true);
insert into recipe(nameRecipe, description, link, isSaved) values('name of recipe 4', 'steeeps','https4://.........',true);
insert into recipe(nameRecipe, description, link, isSaved) values('name of recipe 5', 'steeeps','https5://.........',true);
insert into recipe(nameRecipe, description, link, isSaved) values('name of recipe 6', 'steeeps','https6://.........',true);

insert into amount(idRecipe, idIngredient, amount) values(1,1,1);
insert into amount(idRecipe, idIngredient, amount) values(1,2,2);
insert into amount(idRecipe, idIngredient, amount) values(2,3,3);
insert into amount(idRecipe, idIngredient, amount) values(2,2,14);
insert into amount(idRecipe, idIngredient, amount) values(3,3,5);
insert into amount(idRecipe, idIngredient, amount) values(4,1,6);


update recipe set link = "linkSQL" where idRecipe = 2;

select*from recipe;
select*from ingredient where idIngredient = 2;
select*from amount where idIngredient = 1 and idRecipe = 1;

select*from recipe where nameRecipe like 'name of recipe 5';
select*from recipe as r inner join amount as a on r.idRecipe = a.idRecipe inner join ingredient as i on a.idIngredient = i.idIngredient;
SELECT i.idIngredient, nameIngredient, calories, soldIndividualy, measure, amount FROM recipe AS r INNER JOIN amount AS a ON r.idRecipe = a.idRecipe INNER JOIN ingredient AS i ON a.idIngredient = i.idIngredient WHERE r.idRecipe=5;

update amount set amount=222 where idRecipe = 1 and idIngredient = 1;




/*** DROP ALL ***/
drop table amount;
drop table recipe;
drop table ingredient;


/*** CLEAN DB ***/
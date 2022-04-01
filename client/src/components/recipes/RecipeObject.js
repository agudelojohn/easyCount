export class RecipeObject{
    constructor(name, description, link, ingredients){
        this.name = name;
        this.description = description;
        this.link = link;
        this.ingredients = ingredients;
        this.isSaved = false;
    }

    setInformation( information ) {
        this.information = information;
    }
}
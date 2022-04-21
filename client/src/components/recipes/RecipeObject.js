export class RecipeObject{
    constructor(id, name, description, link, ingredients){
        this.id = id;
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
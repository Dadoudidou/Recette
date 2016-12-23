import { Ingredient } from "./Ingredient";
import { Unite } from "./Unite"
import * as assign from "object-assign";

export interface IRecetteIngredients {
    ingredient: Ingredient
    quantite: number
    unite: Unite
}

var id = 1;

export class Recette {

    readonly __id: number
    id: number

    titre: string
    description: string
    image: string

    realisation: string
    ingredients: IRecetteIngredients[] = []

    nbParts: number
    nbPointsWW: number

    constructor(init?: Partial<Recette>) {
        assign(this, init);
        this.__id = id; id++;
    }

}


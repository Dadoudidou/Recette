import { Ingredient } from "./Ingredient";
import { Unite } from "./Unite"
import * as assign from "object-assign";

export interface IRecetteIngredients extends Ingredient {
    _joinData: {
        quantite: number
        unite: string
    }
}

var id = 1;

export class Recette {

    readonly __id: number
    id: number

    nom: string
    description: string
    image: string

    instructions: string
    ingredients: IRecetteIngredients[] = []

    nbPart: number
    nbPointsWW: number

    constructor(init?: Partial<Recette>) {
        assign(this, init);
        this.__id = id; id++;
    }

}


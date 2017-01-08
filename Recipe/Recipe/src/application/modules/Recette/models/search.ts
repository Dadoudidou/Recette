import { Recette } from "./Recette";
import { Ingredient } from "./Ingredient";

export interface ISearch_Recettes {
    recettes: Recette[]
}

export interface ISearch_Recette {
    recette: Recette
}

export class Filtre {
    type: string
    filtre: Ingredient
}

export interface ISearch_Filtre_Tag {

}

export interface ISearch_Filtre_Ingredient {
    type: 'ingredient',
    filtre: Ingredient
}

export interface ISearch_Filtres {
    filtres: Filtre[]
}
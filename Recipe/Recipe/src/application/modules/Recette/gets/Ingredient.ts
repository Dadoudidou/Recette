import { IRecetteState } from "./../reducers";
import { Ingredient } from "./../models";


function matchString(prop: string): string {
    if (!prop) return undefined;
    return prop.toLowerCase().trim();
}

export const getByUniqueId = (ingredients: Ingredient[], id: number): Ingredient => {

    let _index = ingredients.map(a => a.__id).indexOf(id);
    if (_index > -1) return ingredients[_index];
    return undefined;
}

export const getByNom = (ingredients: Ingredient[], nom: string): Ingredient => {

    let _index = ingredients.map(a => matchString(a.nom)).indexOf(matchString(nom));
    if (_index > -1) return ingredients[_index];
    return undefined;
}

export const exist = (ingredients: Ingredient[], nom: string): boolean => {

    let _index = ingredients.map(a => matchString(a.nom)).indexOf(matchString(nom));
    if (_index > -1) return true;
    return false;
}
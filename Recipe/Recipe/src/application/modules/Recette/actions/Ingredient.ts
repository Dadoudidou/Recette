import { actionCreator } from "src/lib/store/actions";
import { Ingredient } from "./../models";


export const add = actionCreator<Ingredient>("AJOUTER INGREDIENT");

export const update = actionCreator<Ingredient>("MODIFIER INGREDIENT");

export const remove = actionCreator<Ingredient>("SUPPRIMER INGREDIENT");
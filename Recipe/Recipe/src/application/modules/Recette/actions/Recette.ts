import { actionCreator } from "src/lib/store/actions";
import { Recette } from "./../models";

export const add = actionCreator<Recette>("AJOUTER RECETTE");

export const update = actionCreator<Recette>("MODIFIER RECETTE");

export const remove = actionCreator<Recette>("SUPPRIMER RECETTE");
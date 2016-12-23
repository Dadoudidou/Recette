import { actionCreator } from "src/lib/store/actions";
import { Unite } from "./../models";

export const add = actionCreator<Unite>("AJOUTER UNITE");

export const update = actionCreator<Unite>("MODIFIER UNITE");

export const remove = actionCreator<Unite>("SUPPRIMER UNITE");
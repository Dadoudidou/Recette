import * as actions from "./../actions";
import * as models from "./../models";
import * as gets from "./../gets";
import { IAction, isType } from "src/lib/store/actions";



export interface IRecetteState {
    unites?: models.Unite[]
    ingredients?: models.Ingredient[]
    recettes?: models.Recette[]
}

export interface IRecetteReducer {
    recettes: IRecetteState
}

const initialState: IRecetteState = {
    unites: [
        new models.Unite({ symbole: "g", nom: "gramme" }),
        new models.Unite({ symbole: "mg", nom: "milligramme" }),
        new models.Unite({ symbole: "l", nom: "litre" }),
        new models.Unite({ symbole: "ml", nom: "millilitre" }),
        new models.Unite({ symbole: "cc", nom: "cuillère à café" }),
        new models.Unite({ symbole: "cs", nom: "cuillère à soupe" }),
        new models.Unite({ symbole: "verre", nom: "verre de 200ml" }),
        new models.Unite({ symbole: "tasse", nom: "tasse" }),
        new models.Unite({ symbole: "bol", nom: "bol" })
    ],
    ingredients: [],
    recettes: []
}

export const RecetteReducer = (state: IRecetteState = initialState, action: IAction<any>): IRecetteState => {

    

    //#region INGREDIENT

    if (isType(action, actions.ingredients.add)) {
        let _state = JSON.parse(JSON.stringify(state)) as IRecetteState;
        _state.ingredients.push(action.payload);
        return _state;
    }

    if (isType(action, actions.ingredients.update)) {
        let _state = JSON.parse(JSON.stringify(state)) as IRecetteState;
        let _index = _state.ingredients.map(a => a.__id).indexOf(action.payload.__id);
        if (_index > -1) {
            _state.ingredients[_index] = action.payload;
        }
        return _state;
    }

    if (isType(action, actions.ingredients.remove)) {
        let _state = JSON.parse(JSON.stringify(state)) as IRecetteState;
        let _index = _state.ingredients.map(a => a.__id).indexOf(action.payload.__id);
        if (_index > -1) {
            _state.ingredients.splice(_index, 1);
        }
        return _state;
    }

    //#endregion

    //#region UNITE

    if (isType(action, actions.unites.add)) {
        let _state = JSON.parse(JSON.stringify(state)) as IRecetteState;
        _state.unites.push(action.payload);
        return _state;
    }

    if (isType(action, actions.unites.update)) {
        let _state = JSON.parse(JSON.stringify(state)) as IRecetteState;
        let _index = _state.unites.map(a => a.__id).indexOf(action.payload.__id);
        if (_index > -1) {
            _state.unites[_index] = action.payload;
        }
        return _state;
    }

    if (isType(action, actions.unites.remove)) {
        let _state = JSON.parse(JSON.stringify(state)) as IRecetteState;
        let _index = _state.unites.map(a => a.__id).indexOf(action.payload.__id);
        if (_index > -1) {
            _state.unites.splice(_index, 1);
        }
        return _state;
    }

    //#endregion

    //#region RECETTE

    function update_recette_ingredients(state: IRecetteState, recette: models.Recette) {
        for (var i = 0; i < recette.ingredients.length; i++) {
            let ingredient = gets.ingredients.getByNom(state.ingredients, recette.ingredients[i].ingredient.nom);
            if (ingredient) {
                recette.ingredients[i].ingredient = ingredient;
            } else {
                state.ingredients.push(recette.ingredients[i].ingredient);
            }
        }
    }

    if (isType(action, actions.recettes.add)) {
        let _state = JSON.parse(JSON.stringify(state)) as IRecetteState;
        update_recette_ingredients(_state, action.payload);
        _state.recettes.push(action.payload);
        return _state;
    }

    if (isType(action, actions.recettes.update)) {
        let _state = JSON.parse(JSON.stringify(state)) as IRecetteState;
        update_recette_ingredients(_state, action.payload);
        let _index = _state.recettes.map(a => a.__id).indexOf(action.payload.__id);
        if (_index > -1) {
            _state.recettes[_index] = action.payload;
        }
        return _state;
    }

    if (isType(action, actions.recettes.remove)) {
        let _state = JSON.parse(JSON.stringify(state)) as IRecetteState;
        let _index = _state.recettes.map(a => a.__id).indexOf(action.payload.__id);
        if (_index > -1) {
            _state.recettes.splice(_index, 1);
        }
        return _state;
    }

    //#endregion


    return state;
}


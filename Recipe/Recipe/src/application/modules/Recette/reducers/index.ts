import * as actions from "./../actions";
import * as models from "./../models";
import * as gets from "./../gets";
import { IAction, isType } from "src/lib/store/actions";
import * as Immutable from "immutable";


interface IRecetteStateValues {
    unites?: Immutable.List<models.Unite>
    recettesSearch?: Immutable.List<models.Recette>
}

export interface IRecetteState extends Immutable.Map<string, any> {
    
}

export interface IRecetteReducer {
    recettes: IRecetteState
}

const initialState: IRecetteState = Immutable.fromJS({
    unites: Immutable.List<models.Unite>([
        new models.Unite({ symbole: "g", nom: "gramme" }),
        new models.Unite({ symbole: "mg", nom: "milligramme" }),
        new models.Unite({ symbole: "l", nom: "litre" }),
        new models.Unite({ symbole: "ml", nom: "millilitre" }),
        new models.Unite({ symbole: "cc", nom: "cuillère à café" }),
        new models.Unite({ symbole: "cs", nom: "cuillère à soupe" }),
        new models.Unite({ symbole: "verre", nom: "verre de 200ml" }),
        new models.Unite({ symbole: "tasse", nom: "tasse" }),
        new models.Unite({ symbole: "bol", nom: "bol" })
    ]),
    recettesSearch: Immutable.List<models.Recette>()
});

export const RecetteReducer = (state: IRecetteState = initialState, action: IAction<any>): IRecetteState => {


    if (isType(action, actions.recettes.fetchSearchRequest)) {

    }

    if (isType(action, actions.recettes.fetchSearchSuccess)) {
        return state.update("recettesSearch", (val) => Immutable.List(action.payload.response.recettes));
    }

    if (isType(action, actions.recettes.fetchSearchFail)) {

    }

    return state;
}


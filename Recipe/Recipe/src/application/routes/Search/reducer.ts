import { IAction, isType } from "src/lib/store/actions";
import * as Immutable from "immutable";
import * as models from "src/application/modules/Recette/models";
import * as actions from "./actions";

export interface ISearchState extends Immutable.Map<string, any> { }
export interface ISearchReducer {
    Search: ISearchState
}

const inital = Immutable.Map({
    searching_recettes: false,
    searching_filtres: false,
    recettes: Immutable.List<models.Recette>(),
    filtres: Immutable.List<models.Filtre>(),
    search_filtres: Immutable.List<models.Filtre>()
});

export const SearchReducer = (state: ISearchState = inital, action: IAction<any>): ISearchState => {

    if (isType(action, actions.fetchSearchRequest)) {
        return state.update("searching_recettes", () => true);
    }

    if (isType(action, actions.fetchSearchSuccess)) {
        return state
            .update("searching_recettes", () => false)
            .update("recettes", () => Immutable.List(action.payload.response.recettes));
    }

    if (isType(action, actions.fetchSearchFail)) {
        return state.update("searching_recettes", () => false);
    }


    if (isType(action, actions.fetchSearchFiltresRequest)) {
        return state.update("searching_filtres", () => true);
    }

    if (isType(action, actions.fetchSearchFiltresSuccess)) {
        return state
            .update("searching_filtres", () => false)
            .update("search_filtres", () => Immutable.List(action.payload.response.filtres));
    }

    if (isType(action, actions.fetchSearchFiltresFail)) {
        return state.update("searching_filtres", () => false);
    }

    if (isType(action, actions.addFiltre)) {
        return state.update("filtres", (filtres: Immutable.List<models.Filtre>) => filtres.concat([action.payload]));
    }

    if (isType(action, actions.removeFiltre)) {
        return state.update("filtres", (filtres: Immutable.List<models.Filtre>) => {
            let index = filtres.toArray().map(a => a.type + "_" + a.filtre.id).indexOf(action.payload.type + "_" + action.payload.filtre.id);
            if (index > -1) {
                return filtres.remove(index);
            }
            return filtres;
        });
    }



    return state;
}
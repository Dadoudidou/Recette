import { actionCreator } from "src/lib/store/actions";
import * as models from "src/application/modules/Recette/models";

/*
interface ISearch {
    ingredients: models.Ingredient[]
}

export const search = actionCreator<ISearch>("SEARCH RECETTES", (dispatch, event) => {

    dispatch(fetchSearchRequest({ request: event }));
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://recettes.violets.synology.me/api/recettes.json', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    let response = JSON.parse(xhr.responseText);
                    dispatch(fetchSearchSuccess({
                        request: event,
                        response: response
                    }));
                } catch (err) {
                    dispatch(fetchSearchFail({
                        request: event,
                        response: err.message
                    }))
                }

            } else {
                dispatch(fetchSearchFail({
                    request: event,
                    response: xhr.statusText
                }))
            }
        }
    };
    xhr.send(null);

});

export const fetchSearchRequest = actionCreator<{ request: ISearch }>("FETCH SEARCH REQUEST");

export const fetchSearchSuccess = actionCreator<{ request: ISearch, response: { recettes: models.Recette[] } }>("FETCH SEARCH SUCCESS");

export const fetchSearchFail = actionCreator<{ request: ISearch, response: string }>("FETCH SEARCH FAIL");

*/


export const searchFiltres = actionCreator<string>("SEARCH FILTRES", (dispatch, event) => {
    dispatch(fetchSearchFiltresRequest({ request: event }));
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://recettes.violets.synology.me/api/filtres.json?s='+event, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    let response = JSON.parse(xhr.responseText);
                    dispatch(fetchSearchFiltresSuccess({
                        request: event,
                        response: response
                    }));
                } catch (err) {
                    dispatch(fetchSearchFiltresFail({
                        request: event,
                        response: err.message
                    }))
                }

            } else {
                dispatch(fetchSearchFiltresFail({
                    request: event,
                    response: xhr.statusText
                }))
            }
        }
    };
    xhr.send(null);
});

export const fetchSearchFiltresRequest = actionCreator<{ request: string }>("FETCH SEARCH FILTRES REQUEST");

export const fetchSearchFiltresSuccess = actionCreator<{ request: string, response: models.ISearch_Filtres }>("FETCH SEARCH FILTRES SUCCESS");

export const fetchSearchFiltresFail = actionCreator<{ request: string, response: string }>("FETCH SEARCH FILTRES FAIL");


export const addFiltre = actionCreator<models.Filtre>("ADD FILTRE");

export const removeFiltre = actionCreator<models.Filtre>("REMOVE FILTRE");




export const search = actionCreator<{ filtres: models.Filtre[] }>("SEARCH RECETTES", (dispatch, event) => {
    dispatch(fetchSearchRequest({ request: event }));
    let xhr = new XMLHttpRequest();
    var filtres = [];
    for (var i = 0; i < event.filtres.length; i++) {
        filtres.push(event.filtres[i].type + "," + event.filtres[i].filtre.id);
    }
    xhr.open('GET', 'http://recettes.violets.synology.me/api/recettes.json?filtres=' + filtres.join('|'), true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                try {
                    let response = JSON.parse(xhr.responseText);
                    dispatch(fetchSearchSuccess({
                        request: event,
                        response: response
                    }));
                } catch (err) {
                    dispatch(fetchSearchFail({
                        request: event,
                        response: err.message
                    }))
                }

            } else {
                dispatch(fetchSearchFail({
                    request: event,
                    response: xhr.statusText
                }))
            }
        }
    };
    xhr.send(null);
});

export const fetchSearchRequest = actionCreator<{ request: { filtres: models.Filtre[] } }>("FETCH SEARCH RECETTES REQUEST");

export const fetchSearchSuccess = actionCreator<{ request: { filtres: models.Filtre[] }, response: models.ISearch_Recettes }>("FETCH SEARCH RECETTES SUCCESS");

export const fetchSearchFail = actionCreator<{ request: { filtres: models.Filtre[] }, response: string }>("FETCH SEARCH RECETTES FAIL");
import { actionCreator } from "src/lib/store/actions";
import * as models from "./../models";


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
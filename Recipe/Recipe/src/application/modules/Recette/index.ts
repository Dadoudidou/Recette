import { RecetteReducer } from "./reducers";
import { injectAsyncReducer } from "src/lib/store/createStore";

export const loadModules = (store) => {

    injectAsyncReducer(store, "recettes", RecetteReducer);

}
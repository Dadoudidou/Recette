import { loadModules as recetteLoadModules  } from "./Recette";

export const loadModules = (store) => {
    recetteLoadModules(store);
}
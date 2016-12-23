import * as assign from "object-assign";

var id = 1;
export class Ingredient {

    readonly __id: number

    id: number
    nom: string

    constructor(init?: Partial<Ingredient>) {
        assign(this, init);
        this.__id = id; id++;
    }
}
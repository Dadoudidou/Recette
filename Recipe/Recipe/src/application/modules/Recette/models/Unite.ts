import * as assign from "object-assign";

var id = 1;
export class Unite {
    readonly __id: number
    id: number
    nom: string
    symbole: string

    constructor(init?: Partial<Unite>) {
        assign(this, init);
        this.__id = id; id++;
    }
}
declare module "redux-orm" {

    export class Schema {
        register(...args);
        reducer();
    }

    export class QuerySet {
    }

    export class Backend {
    }

    export class Session {
    }

    export class Model {

        static accessId(id: number): any;
        static all(): QuerySet;
        static backend(): any;
        static create(props: any): Model;
        static get(lookupObj: any): Model;
        static getBackendClass(): Backend;
        static hasId(id: any): boolean;
        static nextId(): any;
        static reducer(state: any, action: any, model: Model, session: Session): any;
        static withId(id: any): Model;
        delete(): void;
        equals(otherModel: Model): boolean;
        getClass(): Model;
        getId(): any;
        set(propertyName: string, value: any): void;
        toString(): string;
        update(userMergeObj: any): void

        static toString();

        static modelName: string;
        static fields: { [name: string]: any }
    }

    export function fk(...args);

    export function many(...args);

    export function oneToOne(...args);

}
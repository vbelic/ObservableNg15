export class LookupModel {

    public users: Array<Person> = new Array<Person>();
    public unknowns: Array<Unknown> = new Array<Unknown>();

    constructor () {
        console.log('constructor finished!');
    }
}

export class Person {
    id: number | null = null;
    first_name: string | null = null;
    last_name: string | null = null;
    email: string | null = null;
    avatar: string | null = null;
    name: string | null = null;
}

export interface Unknown {
    id: number;
    name: string;
    year:number;
    color: string;
    pantoneValue: string;
}



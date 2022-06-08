export class MyPokemonList {
    id: number;
    name: string;
    types: string[];
    weight: number;
    abilities: string[];
    image: String;

    constructor() {
        this.abilities  = [];
        this.types = [];
        this.name='';
        this.image='';
    }



}


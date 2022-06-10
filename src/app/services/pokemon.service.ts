import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { MyPokemonList } from "../models/my-pokemon.list";
import { MyPokemonEvolution } from "../models/my-pokemon.evolution";
import { MyPokemonDescription } from "../models/my-pokemon.description";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment.prod';


@Injectable({providedIn: 'root'})
export class PokemonService {
    private pokemonBaseUrl = environment.pokemonBaseUrl; //'http://34.227.207.247:8080/mypokedex/';
    
    constructor(private http: HttpClient) { }
 
    getMyPokemonList(offset: number, limit: number = 20) : Observable<MyPokemonList[]> {
        console.log('PokemonService -> getMyPokemonList');
        return this.http.get<MyPokemonList[]>(this.pokemonBaseUrl + 'pokemons?offset=' + offset + '&limit=' + limit)
        .pipe(
            map((response) => response as MyPokemonList[])
        );
    }

    getMyPokemonEvolution(pokemonId: number): Observable<MyPokemonEvolution> {
        console.log('PokemonService -> getMyPokemonEvolution');
        return this.http.get<MyPokemonEvolution>(this.pokemonBaseUrl + 'evolution/' + pokemonId);
    }

    getMyPokemonDescription(pokemonId: number): Observable<MyPokemonDescription> {
        console.log('PokemonService -> getMyPokemonDescription');
        return this.http.get<MyPokemonDescription>(this.pokemonBaseUrl + 'description/' + pokemonId);
    }

}
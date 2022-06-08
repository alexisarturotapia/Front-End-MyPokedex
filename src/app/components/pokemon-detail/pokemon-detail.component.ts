import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MyPokemonEvolution } from 'src/app/models/my-pokemon.evolution';
import { MyPokemonDescription } from 'src/app/models/my-pokemon.description';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.sass']
})
export class PokemonDetailComponent implements OnInit {

  myEvolution: MyPokemonEvolution = new MyPokemonEvolution();
  myDescription: MyPokemonDescription = new MyPokemonDescription();
  

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private pokemonService: PokemonService) { 
   
    this.getEvolution(data.mypokemon.id);
    this.getDescription(data.mypokemon.id);

  }

  ngOnInit(): void {
  }

  getEvolution(pokemonId: number) {
    console.log('getEvolution');
    this.pokemonService.getMyPokemonEvolution(pokemonId)
      .subscribe((evolution: MyPokemonEvolution) => {
        this.myEvolution=evolution;
      });
  }

  getDescription(pokemonId: number) {
    console.log('getDescription');
    this.pokemonService.getMyPokemonDescription(pokemonId)
      .subscribe((description: MyPokemonDescription) => {
        this.myDescription=description;
      });
  }

}
